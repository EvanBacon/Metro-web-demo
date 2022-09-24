/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import * as LogBoxData from './Data/LogBoxData';
import { LogBoxInspector } from './UI/LogBoxInspector';

import { useLogs } from './Data/LogContext';

export function _LogBoxInspectorContainer() {
  const { selectedLogIndex, logs } = useLogs()

  const _handleDismiss = useCallback((): void => {
    // Here we handle the cases when the log is dismissed and it
    // was either the last log, or when the current index
    // is now outside the bounds of the log array.
    const logsArray = Array.from(logs);
    if (selectedLogIndex != null) {
      if (logsArray.length - 1 <= 0) {
        LogBoxData.setSelectedLog(-1);
      } else if (selectedLogIndex >= logsArray.length - 1) {
        LogBoxData.setSelectedLog(selectedLogIndex - 1);
      }

      LogBoxData.dismiss(logsArray[selectedLogIndex]);
    }
  }, []);

  const _handleMinimize = useCallback((): void => {
    LogBoxData.setSelectedLog(-1);
  }, []);

  const _handleSetSelectedLog = useCallback((index: number): void => {
    LogBoxData.setSelectedLog(index);
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <LogBoxInspector
        onDismiss={_handleDismiss}
        onMinimize={_handleMinimize}
        onChangeSelectedIndex={_handleSetSelectedLog}
      />
    </View>
  );

}

export default (LogBoxData.withSubscription(
  _LogBoxInspectorContainer,
));
