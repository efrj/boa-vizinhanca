import 'dart:convert';
import 'dart:io';
import 'dart:math';
import 'package:http/http.dart' as http;

void main() async {
  final phrasesJson = await File('phrases/phrases.json').readAsString();
  final phrases = jsonDecode(phrasesJson);

  final server = await HttpServer.bind(InternetAddress.anyIPv4, 3000);
  server.listen((request) async {
    final randomPhrase = phrases['doutor_chapatin'][Random().nextInt(phrases['doutor_chapatin'].length)];
    request.response
      ..headers.contentType = ContentType.text
      ..headers.add('Access-Control-Allow-Origin', '*')
      ..write(randomPhrase)
      ..close();
  });

  print('Server started at http://0.0.0.0:3000');
}
