import React from "react";
import Adapter from "utils/enzyme-adapter-react";
import { configure } from "enzyme";
import { createShallow } from "@material-ui/core/test-utils";
import Select from "../Select";

configure({ adapter: new Adapter() });

describe("'<Select />'", () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it("should render component", () => {
    const wrapper = shallow(<Select />);

    expect(wrapper.length).toBe(1);
  });
});
