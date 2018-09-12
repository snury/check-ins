import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "utils/enzyme-adapter-react";
import Container from "../Container";

configure({ adapter: new Adapter() });

const getComponent = (props = {}) =>
  <Container {...props} />;

describe("<Container/>", () => {
  it("should render component", () => {
    const component = mount(getComponent());

    expect(component.find(Container).length).toBe(1);
  });
});
