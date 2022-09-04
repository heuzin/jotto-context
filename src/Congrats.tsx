import React from "react";
import languageContext from "./contexts/languageContext";
import strings from "./helpers/strings";

interface Props {
  success: boolean;
}

const Congrats: React.FC<Props> = ({ success }) => {
  const language = React.useContext(languageContext);

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {strings.getStringByLanguage(language, "congrats")}
        </span>
      </div>
    );
  } else {
    return <div data-test="component-congrats" />;
  }
};

export default Congrats;
