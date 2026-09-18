import gleam/bytes_tree
import gleam/dynamic/decode
import gleam/erlang/process
import gleam/http/request.{type Request}
import gleam/http/response.{type Response}
import gleam/int
import gleam/json
import gleam/list
import mist
import simplifile

pub fn main() {
  let decoder = decode.at(["rosa_rumorosa"], decode.list(decode.string))

  let phrases = case simplifile.read("/app/phrases/phrases.json") {
    Ok(content) -> {
      case json.parse(from: content, using: decoder) {
        Ok(list) -> list
        Error(_) -> ["Error decoding Rosa Rumorosa phrases."]
      }
    }
    Error(_) -> ["Error reading JSON file."]
  }

  let web_service = fn(_req: Request(mist.Connection)) -> Response(mist.ResponseData) {
    let count = list.length(phrases)
    let random_index = int.random(count)
    let phrase = case list.first(list.drop(phrases, random_index)) {
      Ok(p) -> p
      Error(_) -> "Rosa Rumorosa no comando!"
    }

    response.new(200)
    |> response.set_header("access-control-allow-origin", "*")
    |> response.set_header("content-type", "text/plain; charset=utf-8")
    |> response.set_body(mist.Bytes(bytes_tree.from_string(phrase)))
  }

  let assert Ok(_) =
    mist.new(web_service)
    |> mist.bind("0.0.0.0")
    |> mist.port(8000)
    |> mist.start

  process.sleep_forever()
}
