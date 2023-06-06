use strict;
use warnings;
use IO::Socket::INET;

my @phrases = (
    "Ai, Chaves, você só não é mais burro por falta de vitaminas.",
    "Pois é, pois é, pois é.",
    "O que você tem de burro, você tem de burro!",
    "Papaizinho lindo, meu amor!",
    "A filhinha do Madruguinha disse com licencinha.",
    "Você vai ver! Eu vou contar tudo pro meu pai que você me bateu, me…",
    "“Ué, ué, ué, ué, ué!!!",
    "Diga, papi…",
    "Só podia ser o Chaves de novo!",
    "Velha coroca."
);

sub randomPhrase {
    my $indice = int(rand(scalar @phrases));
    return $phrases[$indice];
}

my $server = IO::Socket::INET->new(
    LocalAddr => '0.0.0.0',
    LocalPort => 8000,
    Type      => SOCK_STREAM,
    Reuse     => 1,
    Listen    => 10,
) or die "Could not create socket: $!\n";

print "Server running at http://localhost:8000/\n";

while (1) {
    my $client = $server->accept();

    if ($client) {
        my $request = <$client>;

        my $response = "HTTP/1.1 200 OK\r\n";
        $response .= "Access-Control-Allow-Origin: *\r\n";
        $response .= "Content-Type: text/html;charset=UTF-8\r\n";
        $response .= "\r\n";
        $response .= randomPhrase();

        print $client $response;

        $client->close();
    }
}
