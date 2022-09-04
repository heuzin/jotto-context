import React from "react";
import languageContext from "./contexts/languageContext";
import strings from "./helpers/strings";

interface GuessedWordsProps {
  guessedWord: string;
  letterMatchCount: number;
}

interface Props {
  guessedWords: GuessedWordsProps[];
}

const GuessedWords: React.FC<Props> = ({ guessedWords }) => {
  const language = React.useContext(languageContext);
  let contents: JSX.Element | undefined = undefined;
  if (guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">
        {strings.getStringByLanguage(language, "guessPrompt")}
      </span>
    );
  } else {
    const guessedWordsRows = guessedWords.map((word, index) => (
      <tr data-test="guessed-word" key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test="guessed-words">
        <h3>{strings.getStringByLanguage(language, "guessedWords")}</h3>
        <table className="table table-sm">
          <thead className="thead-light">
            <tr>
              <th>
                {strings.getStringByLanguage(language, "guessColumnHeader")}
              </th>
              <th>
                {strings.getStringByLanguage(
                  language,
                  "matchingLettersColumnHeader"
                )}
              </th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};

export default GuessedWords;
