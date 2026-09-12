{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE DeriveGeneric #-}

import Network.Wai
import Network.Wai.Handler.Warp
import Network.HTTP.Types
import Data.Aeson
import qualified Data.ByteString.Lazy as BL
import qualified Data.Text as T
import qualified Data.Text.Encoding as TE
import System.Random
import GHC.Generics
import Control.Exception (catch, SomeException(..))

data Phrases = Phrases {
    tripa_seca :: Maybe [T.Text]
} deriving (Show, Generic)

instance FromJSON Phrases

main :: IO ()
main = do
    putStrLn "Server running at http://0.0.0.0:8000/"
    run 8000 app

app :: Application
app _ respond = do
    phrasesResult <- loadPhrases
    case phrasesResult of
        Left err -> do
            putStrLn $ "Error reading JSON file: " ++ err
            respond $ responseLBS status500 [("Content-Type", "text/plain; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] "Error reading Tripa Seca phrases."
        Right phrasesList ->
            if null phrasesList
                then respond $ responseLBS status500 [("Content-Type", "text/plain; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] "Tripa Seca phrases not found in JSON file."
                else do
                    idx <- randomRIO (0, length phrasesList - 1)
                    let chosen = phrasesList !! idx
                    respond $ responseLBS status200 [("Content-Type", "text/html; charset=utf-8"), ("Access-Control-Allow-Origin", "*")] (BL.fromStrict $ TE.encodeUtf8 chosen)

loadPhrases :: IO (Either String [T.Text])
loadPhrases = (do
    contents <- BL.readFile "phrases/phrases.json"
    case decode contents of
        Just p  -> case tripa_seca p of
            Just list -> return (Right list)
            Nothing   -> return (Left "tripa_seca key missing")
        Nothing -> return (Left "Invalid JSON format")
    ) `catch` (\(SomeException e) -> return (Left (show e)))
