import com.sun.net.httpserver.{HttpExchange, HttpHandler, HttpServer}
import java.io.FileReader
import java.net.InetSocketAddress
import java.nio.charset.StandardCharsets
import org.json.simple.{JSONArray, JSONObject}
import org.json.simple.parser.JSONParser
import scala.util.Random

object Main {
  private val JsonFilePath = "phrases/phrases.json"

  def main(args: Array[String]): Unit = {
    val server = HttpServer.create(new InetSocketAddress(8000), 0)
    server.createContext("/", new MyHandler())
    server.setExecutor(null)
    server.start()
    println("Server running at http://0.0.0.0:8000/")
  }

  class MyHandler extends HttpHandler {
    private val phrases: Array[String] = loadPhrasesFromJson()

    override def handle(exchange: HttpExchange): Unit = {
      val response = getRandomPhrase()
      exchange.getResponseHeaders.set("Content-Type", "text/html; charset=UTF-8")
      exchange.getResponseHeaders.set("Access-Control-Allow-Origin", "*")
      exchange.getResponseHeaders.set("Cache-Control", "no-cache, no-store, must-revalidate")

      val responseBytes = response.getBytes(StandardCharsets.UTF_8)
      exchange.sendResponseHeaders(200, responseBytes.length)

      val os = exchange.getResponseBody
      os.write(responseBytes)
      os.close()
    }

    private def getRandomPhrase(): String = {
      if (phrases.nonEmpty) {
        phrases(Random.nextInt(phrases.length))
      } else {
        "Error reading Racha Cuca phrases."
      }
    }

    private def loadPhrasesFromJson(): Array[String] = {
      try {
        val parser = new JSONParser()
        val jsonObject = parser.parse(new FileReader(JsonFilePath)).asInstanceOf[JSONObject]
        val jsonArray = jsonObject.get("racha_cuca").asInstanceOf[JSONArray]

        val result = new Array[String](jsonArray.size())
        for (i <- 0 until jsonArray.size()) {
          result(i) = jsonArray.get(i).asInstanceOf[String]
        }
        result
      } catch {
        case e: Exception =>
          println(s"Error reading JSON file: ${e.getMessage}")
          Array.empty[String]
      }
    }
  }
}
