PROCEDURE Main()
   LOCAL cJson, hData, aPhrases, nIdx, cPhrase
   LOCAL cJsonPath := "phrases/phrases.json"

   cJson := MemoRead(cJsonPath)
   IF Empty(cJson)
      cJson := MemoRead("/app/phrases/phrases.json")
   ENDIF

   hb_jsonDecode(cJson, @hData)

   IF hb_IsHash(hData) .AND. hb_HHasKey(hData, "jaiminho")
      aPhrases := hData["jaiminho"]
      IF Len(aPhrases) > 0
         nIdx := hb_RandomInt(1, Len(aPhrases))
         cPhrase := aPhrases[nIdx]
         OutStd(cPhrase)
      ENDIF
   ELSE
      OutStd("Eu quero evitar a fadiga!")
   ENDIF

   RETURN
