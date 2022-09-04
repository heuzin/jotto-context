import React from "react";
import { mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import Input from "./Input";
import LanguageContext from "./contexts/languageContext";

type Props = {
  language?: string;
  secretWord?: string;
  success?: boolean;
};

const setup = ({ language, secretWord, success }: Props) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;
  return mount(
    <LanguageContext.Provider value={language}>
      <Input success={success} secretWord={secretWord} />
    </LanguageContext.Provider>
  );
};

describe("render", () => {
  describe("success is true", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test("Input renders without error", () => {
      const inputComponent = findByTestAttr!(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box does not show", () => {
      const inputBox = findByTestAttr!(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });

    test("submit burron does not show", () => {
      const submitButton = findByTestAttr!(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe("success is false", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      wrapper = setup({ success: false });
    });

    test("Input renders without error", () => {
      const inputComponent = findByTestAttr!(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });

    test("input box does not show", () => {
      const inputBox = findByTestAttr!(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });

    test("submit burron does not show", () => {
      const submitButton = findByTestAttr!(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});

describe("state controlled input field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper: ReactWrapper;
  let originalUseState: any;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr!(wrapper, "input-box");

    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  test("field is cleared upon submit click", () => {
    const inputBox = findByTestAttr!(wrapper, "submit-button");

    inputBox.simulate("click", { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("languagePicker", () => {
  test("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });

  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("🚀");
  });
});
