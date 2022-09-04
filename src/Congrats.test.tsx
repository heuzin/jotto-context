import { mount } from "enzyme";

import { findByTestAttr } from "../test/testUtils";
import Congrats from "./Congrats";
import LanguageContext from "./contexts/languageContext";

type Props = {
  success?: boolean;
  language?: string;
};

const setup = ({ success, language }: Props) => {
  language = language || "en";
  success = success || false;

  return mount(
    <LanguageContext.Provider value={language}>
      <Congrats success={success} />
    </LanguageContext.Provider>
  );
};

describe("languagePicker", () => {
  test("correctly renders congrats string in english", () => {
    const wraper = setup({ success: true });
    expect(wraper.text()).toBe("Congratulations! You guessed the word!");
  });
  test("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ success: true, language: "emoji" });
    expect(wrapper.text()).toBe("🎯🎉");
  });
});

test("renders without error", () => {
  const wrapper = setup({});
  const component = findByTestAttr!(wrapper, "component-congrats");
  expect(component.length).toBe(1);
});

test("renders wno text when 'success' prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr!(wrapper, "component-congrats");
  expect(component.text()).toBe("");
});

test("renders non-empty congrats message when 'success' prop is true", () => {
  const wrapper = setup({ success: true });
  const message = findByTestAttr!(wrapper, "congrats-message");
  expect(message.text().length).not.toBe(0);
});
