open Yojson.Basic.Util

let json_file = "phrases/phrases.json"

let load_phrases () =
  try
    let json = Yojson.Basic.from_file json_file in
    let phrases_json = json |> member "quase_nada" |> to_list in
    List.map to_string phrases_json
  with
  | exn ->
      Printf.printf "Error reading JSON file: %s\n%!" (Printexc.to_string exn);
      []

let get_random_phrase phrases =
  match phrases with
  | [] -> "Error reading Quase Nada phrases."
  | list ->
      let len = List.length list in
      let idx = Random.int len in
      List.nth list idx

let () =
  Random.self_init ();
  let server = Tiny_httpd.create ~port:8000 ~addr:"0.0.0.0" () in

  Tiny_httpd.add_route_handler server
    Tiny_httpd.Route.(exact_path "/" return)
    (fun _req ->
      let phrases = load_phrases () in
      let phrase = get_random_phrase phrases in
      let headers = [
        ("Content-Type", "text/html; charset=utf-8");
        ("Access-Control-Allow-Origin", "*");
      ] in
      Tiny_httpd.Response.make_string ~headers (Ok phrase));

  Printf.printf "Server running at http://0.0.0.0:8000/\n%!";
  match Tiny_httpd.run server with
  | Ok () -> ()
  | Error e -> Printf.eprintf "Server error: %s\n%!" (Printexc.to_string e)
