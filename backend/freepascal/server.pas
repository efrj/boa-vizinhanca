program server;

{$mode objfpc}{$H+}

uses
  {$IFDEF UNIX}
  cthreads,
  {$ENDIF}
  Classes, SysUtils, fphttpserver, fpjson, jsonparser;

type
  TPoucasTrancasServer = class(TFPHttpServer)
  private
    FPhrases: TJSONArray;
    procedure LoadPhrases;
    procedure RequestErrorHandler(Sender: TObject; E: Exception);
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
  OnRequestError := @RequestErrorHandler;
  LoadPhrases;
end;

destructor TPoucasTrancasServer.Destroy;
begin
  if FPhrases <> nil then
    FPhrases.Free;
  inherited Destroy;
end;

procedure TPoucasTrancasServer.RequestErrorHandler(Sender: TObject; E: Exception);
begin
  WriteLn('Erro na requisição: ', E.Message);
  Flush(Output);
end;

procedure TPoucasTrancasServer.LoadPhrases;
var
  JsonFile: string;
  FileStream: TFileStream;
  Parser: TJSONParser;
  RootObj: TJSONObject;
  JsonData: TJSONData;
  CharacterData: TJSONData;
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
          JsonData := Parser.Parse;
          try
            if (JsonData <> nil) and (JsonData is TJSONObject) then
            begin
              RootObj := TJSONObject(JsonData);
              CharacterData := RootObj.Find('poucas_trancas');
              if (CharacterData <> nil) and (CharacterData is TJSONArray) then
              begin
                FPhrases := TJSONArray(CharacterData.Clone);
              end;
            end;
          finally
            if JsonData <> nil then
              JsonData.Free;
          end;
        finally
          Parser.Free;
        end;
      finally
        FileStream.Free;
      end;
    except
      on E: Exception do
      begin
        WriteLn('Erro ao carregar frases: ', E.Message);
        Flush(Output);
      end;
    end;
  end;
end;

procedure TPoucasTrancasServer.HandleRequest(var ARequest: TFPHTTPConnectionRequest;
  var AResponse: TFPHTTPConnectionResponse);
var
  Idx: Integer;
  SelectedPhrase: string;
begin
  try
    AResponse.SetCustomHeader('Access-Control-Allow-Origin', '*');
    AResponse.SetCustomHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    AResponse.SetCustomHeader('Access-Control-Allow-Headers', '*');
    AResponse.SetCustomHeader('Connection', 'close');

    if ARequest.Method = 'OPTIONS' then
    begin
      AResponse.Code := 204;
      AResponse.Content := '';
      AResponse.ContentLength := 0;
      Exit;
    end;

    AResponse.Code := 200;
    AResponse.ContentType := 'text/plain; charset=utf-8';

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

    AResponse.ContentLength := Length(AResponse.Content);
  except
    on E: Exception do
    begin
      AResponse.Code := 500;
      AResponse.ContentType := 'text/plain; charset=utf-8';
      AResponse.Content := 'Erro interno do servidor';
      AResponse.ContentLength := Length(AResponse.Content);
    end;
  end;
end;

var
  HttpServer: TPoucasTrancasServer;
begin
  Randomize;
  HttpServer := TPoucasTrancasServer.Create(nil);
  try
    HttpServer.Port := 8000;
    HttpServer.Threaded := True;
    HttpServer.QueueSize := 128;
    WriteLn('Servidor Free Pascal rodando na porta 8000...');
    Flush(Output);
    HttpServer.Active := True;
  finally
    HttpServer.Free;
  end;
end.
