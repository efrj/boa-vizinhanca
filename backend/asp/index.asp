<!--#include file="aspjson.asp"-->
<%
Response.CharSet = "UTF-8"
Response.ContentType = "text/html; charset=utf-8"
Response.AddHeader "Access-Control-Allow-Origin", "*"

Dim fso, file, content, path, oJSON, phrases, count, randIdx
Set fso = Server.CreateObject("Scripting.FileSystemObject")
path = Server.MapPath("phrases/phrases.json")

If fso.FileExists(path) Then
    Set file = fso.OpenTextFile(path, 1)
    content = file.ReadAll
    file.Close

    Dim posStart, posEnd, jsonText
    jsonText = content
    posStart = InStr(content, """racha_cuca""")
    If posStart > 0 Then
        posEnd = InStr(posStart, content, "]")
        If posEnd > posStart Then
            jsonText = "{" & Mid(content, posStart, posEnd - posStart + 1) & "}"
        End If
    End If

    Set oJSON = New aspJSON
    oJSON.loadJSON(jsonText)

    If oJSON.data.Exists("racha_cuca") Then
        Set phrases = oJSON.data("racha_cuca")
        count = phrases.Count
        If count > 0 Then
            Randomize
            randIdx = Int(Rnd * count)
            Response.Write phrases.item(randIdx)
        Else
            Response.Write "Error reading Racha Cuca phrases."
        End If
    Else
        Response.Write "Error reading Racha Cuca phrases."
    End If
Else
    Response.Write "Error reading JSON file: phrases/phrases.json not found."
End If
%>
