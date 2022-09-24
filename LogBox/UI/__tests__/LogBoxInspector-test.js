/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @emails oncall+react_native
 * @flow strict-local
 */

"use strict";

import React from "react";
import { LogBoxInspector } from "../LogBoxInspector";
import { LogBoxLog } from "../../Data/LogBoxLog";
const render = require("../../../../jest/renderer");

const logs = [
  new LogBoxLog({
    level: "warn",
    isComponentError: false,
    message: {
      content: "Some kind of message (first)",
      substitutions: [],
    },
    stack: [],
    category: "Some kind of message (first)",
    componentStack: [],
  }),
  new LogBoxLog({
    level: "error",
    isComponentError: false,
    message: {
      content: "Some kind of message (second)",
      substitutions: [],
    },
    stack: [],
    category: "Some kind of message (second)",
    componentStack: [],
  }),
  new LogBoxLog({
    level: "fatal",
    isComponentError: false,
    message: {
      content: "Some kind of message (third)",
      substitutions: [],
    },
    stack: [],
    category: "Some kind of message (third)",
    componentStack: [],
  }),
];

describe("LogBoxContainer", () => {
  it("should render null with no logs", () => {
    const output = render.shallowRender(
      <LogBoxInspector
        onDismiss={() => {}}
        onMinimize={() => {}}
        onChangeSelectedIndex={() => {}}
        logs={[]}
        selectedLogIndex={0}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("should render warning with selectedIndex 0", () => {
    const output = render.shallowRender(
      <LogBoxInspector
        onDismiss={() => {}}
        onMinimize={() => {}}
        onChangeSelectedIndex={() => {}}
        logs={logs}
        selectedLogIndex={0}
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("should render fatal with selectedIndex 2", () => {
    const output = render.shallowRender(
      <LogBoxInspector
        onDismiss={() => {}}
        onMinimize={() => {}}
        onChangeSelectedIndex={() => {}}
        logs={logs}
        selectedLogIndex={2}
        fatalType="fatal"
      />
    );

    expect(output).toMatchSnapshot();
  });
});
