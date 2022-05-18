/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type StackFrame = any;

export type CodeFrame = {
  content: string;
  location?: {
    row: number;
    column: number;
    [key: string]: any;
  };
  fileName: string;
};

export type SymbolicatedStackTrace = {
  stack: Array<StackFrame>;
  codeFrame?: CodeFrame;
};

async function symbolicateStackTrace(
  stack: Array<StackFrame>
): Promise<SymbolicatedStackTrace> {
  // Lazy-load `fetch` until the first symbolication call to avoid circular requires.

  const response = await fetch(window.location.host + "?symbolicate", {
    method: "POST",
    body: JSON.stringify({ stack }),
  });
  return await response.json();
}

export default symbolicateStackTrace;
