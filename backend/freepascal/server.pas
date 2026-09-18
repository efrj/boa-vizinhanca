program server;

{$mode objfpc}{$H+}

uses
  Classes, SysUtils, fphttpserver, fpjson, jsonparser;

type
  TPoucasTrancasServer = class(TFPHttpServer)
  private
    FPhrases: TJSONArray;
    procedure LoadPhrases;
  public
    constructor Create(AOwner: TComponent); override;
    destructor Destroy; override;
    procedure HandleRequest(var ARequest: TFPHTTPConnectionRequest;
      var AResponse: TFPHTTPConnectionResponse); override;
  end;

constructor TPoucasTrancasServer.Create(AOwner: TComponent);
begin
  inherited Create(AOwner);
  FPhrases := nil;
  LoadPhrases;
end;

destructor TPoucasTrancasServer.Destroy;
begin
  if FPhrases <> nil then
    FPhrases.Free;
  inherited Destroy;
end;

procedure TPoucasTrancasServer.LoadPhrases;
var
  JsonFile: string;
  FileStream: TFileStream;
  Parser: TJSONParser;
  Data: TJSONObject;
  RawData: TJSONData;
begin
  JsonFile := 'phrases/phrases.json';
  if not FileExists(JsonFile) then
    JsonFile := '/app/phrases/phrases.json';

  if FileExists(JsonFile) then
  begin
    try
      FileStream := TFileStream.Create(JsonFile, fmOpenRead or fmShareDenyNone);
      try
        Parser := TJSONParser.Create(FileStream, []);
        try
          RawData := Parser.Parse;
          if (RawData <> nil) and (RawData is TJSONObject) then
          begin
            Data := TJSONObject(RawData);
            RawData := Data.Find('poucas_trancas');
            if (RawData <> nil) and (RawData is TJSONArray) then
            begin
              FPhrases := TJSONArray(RawData.Clone);
            end;
          end;
        finally
          Parser.Free;
        end;
      finally
        FileStream.Free;
      end;
    except
      on E: Exception do
        WriteLn('Erro ao carregar frases: ', E.Message);
    end;
  end;
end;

procedure TPoucasTrancasServer.HandleRequest(var ARequest: TFPHTTPConnectionRequest;
  var AResponse: TFPHTTPConnectionResponse);
var
  Idx: Integer;
  SelectedPhrase: string;
begin
  AResponse.SetCustomHeader('Access-Control-Allow-Origin', '*');
  AResponse.ContentType := 'text/html; charset=utf-8';

  if (FPhrases <> nil) and (FPhrases.Count > 0) then
  begin
    Idx := Random(FPhrases.Count);
    SelectedPhrase := FPhrases.Strings[Idx];
    AResponse.Content := SelectedPhrase;
  end
  else
  begin
    AResponse.Content := 'Nem o Chapolin Colorado pode com a lei do funil!';
  end;

  AResponse.SendContent;
end;

var
  HttpServer: TPoucasTrancasServer;
begin
  Randomize;
  HttpServer := TPoucasTrancasServer.Create(nil);
  try
    HttpServer.Port := 8000;
    WriteLn('Servidor Free Pascal rodando na porta 8000...');
    HttpServer.Active := True;
  finally
    HttpServer.Free;
  end;
end.
