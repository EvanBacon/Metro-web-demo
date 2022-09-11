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
import { LogBoxInspectorHeader } from "../LogBoxInspectorHeader";
const render = require("../../../../jest/renderer");

describe("LogBoxInspectorHeader", () => {
  it("should render no buttons for one total", () => {
    const output = render.shallowRender(
      <LogBoxInspectorHeader
        onSelectIndex={() => {}}
        selectedIndex={0}
        total={1}
        level="warn"
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("should render both buttons for two total", () => {
    const output = render.shallowRender(
      <LogBoxInspectorHeader
        onSelectIndex={() => {}}
        selectedIndex={1}
        total={2}
        level="warn"
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("should render two buttons for three or more total", () => {
    const output = render.shallowRender(
      <LogBoxInspectorHeader
        onSelectIndex={() => {}}
        selectedIndex={0}
        total={1}
        level="warn"
      />
    );

    expect(output).toMatchSnapshot();
  });

  it("should render syntax error header", () => {
    const output = render.shallowRender(
      <LogBoxInspectorHeader
        onSelectIndex={() => {}}
        selectedIndex={0}
        total={1}
        level="syntax"
      />
    );

    expect(output).toMatchSnapshot();
  });
});
