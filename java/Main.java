import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Main {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);
        server.createContext("/", new MyHandler());
        server.setExecutor(null);
        server.start();
    }

    static class MyHandler implements HttpHandler {
        private final String[] phrases = {
            "Tinha que ser o Chaves mesmo!",
            "Porque sempre que eu chego na vila você me recebe com uma pancada?",
            "Pague o aluguel!",
            "Pague o meu aluguel!",
            "Basta!",
            "É melhor eu ir embora porque pode ser contagioso!",
            "Não tem dinheiro para pagar o aluguel, mas tem dinheiro para ir a Acapulco!",
            "Afaste-se!!",
            "Você não sabe que só os idiotas respondem uma pergunta com outra pergunta?",
            "Eles existem, os discos voadores existem!"
        };

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = getRandomPhrase();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }

        private String getRandomPhrase() {
            int randomIndex = (int) (Math.random() * phrases.length);
            return phrases[randomIndex];
        }
    }
}
