import React from "react";
import App from "./App";
import { mount } from "enzyme";
import { findByTestAttr } from "../test/testUtils";
import { getSecretWord as mockGetSecretWord } from "./actions";

jest.mock("./actions");
const add = jest.mock("");
const setup = () => {
  return mount(<App />);
};

describe.each([
  [null, true, false],
  ["party", false, true],
])("renders with secretWord as %s", (secretWord, loadingShows, appShows) => {
  let wrapper: any;
  let orinialUseReducer: any;

  beforeEach(() => {
    orinialUseReducer = React.useReducer;

    const mockUseReducer = jest
      .fn()
      .mockReturnValue([{ secretWord, language: "en" }, jest.fn()]);
    React.useReducer = mockUseReducer;
    wrapper = setup();
  });

  afterEach(() => {
    React.useReducer = orinialUseReducer;
  });

  test(`renders loading spinner: ${loadingShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "spinner");
    expect(spinnerComponent.exists()).toBe(loadingShows);
  });

  test(`renders app: ${appShows}`, () => {
    const spinnerComponent = findByTestAttr(wrapper, "component-app");
    expect(spinnerComponent.exists()).toBe(appShows);
  });
});

describe("get secret word", () => {
  beforeEach(() => {
    (mockGetSecretWord as jest.Mocked<any>).mockClear();
  });
  test("getSecretWord on app mount", () => {
    const wrapper = setup();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test("getSecretWord does not run on app update", () => {
    const wrapper = setup();
    (mockGetSecretWord as jest.Mocked<any>).mockClear();

    wrapper.setProps({});

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});
