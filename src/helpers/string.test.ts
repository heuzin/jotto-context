import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("language string testing", () => {
  let originalWarn = console.warn;
  const mockWarn = jest.fn();

  beforeEach(() => {
    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarn;
  });

  test("return correct submit string for english", () => {
    const string = getStringByLanguage("en", "submit", strings as any);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns the correct submit string for emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings as any);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns english submit string when language does not exists", () => {
    const string = getStringByLanguage(
      "notALanguage",
      "submit",
      strings as any
    );
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [notALanguage]"
    );
  });

  test("returns english submit string when submit key does not exists for language", () => {
    const string = getStringByLanguage("mermish", "submit", strings as any);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [mermish]"
    );
  });
});
