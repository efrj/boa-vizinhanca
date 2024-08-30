use strict;
use warnings;
use IO::Socket::INET;
use JSON::XS;
use Encode;

my $json_file = 'phrases/phrases.json';

my $json_text = do {
    open my $json_fh, '<', $json_file
        or die("Can't open $json_file: $!");
    local $/;
    <$json_fh>
};

my $phrases_ref = decode_json($json_text)->{chiquinha};

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

sub randomPhrase {
    my $indice = int(rand(scalar @{$phrases_ref}));
    my $phrase = $phrases_ref->[$indice];

    return Encode::encode('UTF-8', $phrase);
}
