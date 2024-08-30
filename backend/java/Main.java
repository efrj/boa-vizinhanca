import java.io.IOException;
import java.io.OutputStream;
import java.io.FileReader;
import java.net.InetSocketAddress;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    private static final String JSON_FILE_PATH = "phrases/phrases.json";

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/", new MyHandler());
        server.setExecutor(null);
        server.start();
    }

    static class MyHandler implements HttpHandler {
        private final String[] phrases;

        public MyHandler() {
            this.phrases = loadPhrasesFromJson();
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = getRandomPhrase();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().set("Cache-Control", "no-cache, no-store, must-revalidate");
            byte[] responseBytes = response.getBytes("UTF-8");
            exchange.sendResponseHeaders(200, responseBytes.length);
            OutputStream os = exchange.getResponseBody();
            os.write(responseBytes);
            os.close();
        }

        private String getRandomPhrase() {
            int randomIndex = (int) (Math.random() * phrases.length);
            return phrases[randomIndex];
        }

        private String[] loadPhrasesFromJson() {
            try {
                JSONParser parser = new JSONParser();
                JSONObject jsonObject = (JSONObject) parser.parse(new FileReader(JSON_FILE_PATH));
                JSONArray jsonArray = (JSONArray) jsonObject.get("seu_barriga");

                String[] phrases = new String[jsonArray.size()];
                for (int i = 0; i < jsonArray.size(); i++) {
                    phrases[i] = (String) jsonArray.get(i);
                }

                return phrases;
            } catch (IOException | ParseException e) {
                e.printStackTrace();
                return new String[0];
            }
        }
    }
}
