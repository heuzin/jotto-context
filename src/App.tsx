import React, { useEffect } from "react";
import "./App.css";
import { getSecretWord } from "./actions";
import Congrats from "./Congrats";
import GuessedWords from "./GuessedWords";
import Input from "./Input";
import LanguageContext from "./contexts/languageContext";
import LanguagePicker from "./LanguagePicker";

type State = {
  secretWord: string | null;
  language: string;
};

type Action =
  | { type: "setSecretWord"; payload: string | null }
  | { type: "setLanguage"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "setSecretWord":
      return { ...state, secretWord: action.payload };
    case "setLanguage":
      return { ...state, language: action.payload };
    default:
      throw new Error(`Invalid action type`);
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: "en",
  });

  const success = false;

  const setSecretWord = (setSecretWord: string) => {
    dispatch({ type: "setSecretWord", payload: setSecretWord });
  };

  const setLanguage = (language: string) => {
    dispatch({ type: "setLanguage", payload: language });
  };

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  if (state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role={"status"}>
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    );
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <Congrats success={false} />
        <Input success={success} secretWord={state.secretWord!} />
        <GuessedWords
          guessedWords={[{ guessedWord: "train", letterMatchCount: 3 }]}
        />
      </LanguageContext.Provider>
    </div>
  );
}

export default App;
