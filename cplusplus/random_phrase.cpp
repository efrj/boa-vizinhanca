#include <httplib.h>
#include <nlohmann/json.hpp>
#include <fstream>
#include <random>

using json = nlohmann::json;

int main() {
    httplib::Server svr;

    svr.Get("/", [](const httplib::Request&, httplib::Response& res) {
        std::ifstream file("phrases/phrases.json");
        json phrases;
        file >> phrases;

        auto& doutorChapatin = phrases["doutor_chapatin"];
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(0, doutorChapatin.size() - 1);
        int indice = dis(gen);

        std::string randomphrase = doutorChapatin[indice];
        res.set_content(randomphrase, "text/plain");
        res.set_header("Access-Control-Allow-Origin", "*");
    });

    svr.listen("0.0.0.0", 8080);
    return 0;
}
