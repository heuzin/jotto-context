import React from "react";
import languageContext from "./contexts/languageContext";
import strings from "./helpers/strings";

interface Props {
  success: boolean;
  secretWord: string;
}

const Input: React.FC<Props> = ({ success, secretWord }) => {
  const language = React.useContext(languageContext);
  const [currentGuess, setCurrentGuess] = React.useState("");

  if (success) {
    return <div data-test="component-input" />;
  }
  return (
    <div data-test="component-input">
      <form data-test="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type={"text"}
          placeholder={strings.getStringByLanguage(
            language,
            "guessInputPlaceholder"
          )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb2"
          onClick={(e) => {
            e.preventDefault();
            setCurrentGuess("");
          }}
        >
          {strings.getStringByLanguage(language, "submit")}
        </button>
      </form>
    </div>
  );
};

export default Input;
