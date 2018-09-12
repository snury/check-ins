import React from "react";
import Adapter from "utils/enzyme-adapter-react";
import { configure } from "enzyme";
import { createShallow } from "@material-ui/core/test-utils";
import Table from "../Table";

configure({ adapter: new Adapter() });

describe("'<Table />'", () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });

  it("should render component", () => {
    const wrapper = shallow(<Table />);

    expect(wrapper.length).toBe(1);
  });
});
