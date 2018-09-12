import { getClassName } from "./../components";

describe("getClassName", () => {
  it("should return BEM style string", () => {
    const ccn = getClassName("block");
    expect(ccn()).toBe("block");
    expect(ccn("elem")).toBe("block__elem");
    expect(ccn("elem--mod")).toBe("block__elem--mod");
  });
});
