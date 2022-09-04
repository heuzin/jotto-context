import { ReactWrapper, ShallowWrapper } from "enzyme";

export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => {
  return wrapper.find(`[data-test='${val}']`);
};
