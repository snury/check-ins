// @flow

/* eslint-disable import/prefer-default-export */

export const getClassName: Function = (componentClassName = "") =>
  (elementClassName = null) =>
    [componentClassName]
      .concat(elementClassName)
      .join(elementClassName && elementClassName.indexOf("_") !== 0 ? "__" : "");
