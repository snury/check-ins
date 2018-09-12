// @flow

import React from "react";
import cx from "classnames";
import type { Node } from "react";
import "./Container.scss";

type Props = {
  className?: string,
  children: Node
}

export default (props: Props) => (
  <div className={cx("container", props.className)}>
    {props.children}
  </div>
);
