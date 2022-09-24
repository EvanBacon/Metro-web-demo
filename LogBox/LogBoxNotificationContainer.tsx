/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import * as LogBoxData from './Data/LogBoxData';
import { LogBoxLog } from './Data/LogBoxLog';
import { useLogs } from './Data/LogContext';
import { LogBoxLogNotification } from './UI/LogBoxNotification';
import { useRejectionHandler } from './useRejectionHandler';


export function _LogBoxNotificationContainer() {
  useRejectionHandler();
  const { logs, isDisabled } = useLogs();
  if (!logs.length || isDisabled) {
    return null
  }
  return (<ToastFooter logs={logs} />);
}

function ToastFooter({ logs }: { logs: LogBoxLog[] }) {
  const onDismissWarns = useCallback(() => {
    LogBoxData.clearWarnings();
  }, []);

  const onDismissErrors = useCallback(() => {
    LogBoxData.clearErrors();
  }, []);

  const setSelectedLog = useCallback((index: number): void => {
    LogBoxData.setSelectedLog(index);
  }, []);

  function openLog(log: LogBoxLog) {
    let index = logs.length - 1;

    // Stop at zero because if we don't find any log, we'll open the first log.
    while (index > 0 && logs[index] !== log) {
      index -= 1;
    }
    setSelectedLog(index);
  }

  const warnings = useMemo(() => logs.filter(log => log.level === 'warn'), [logs]);

  const errors = useMemo(() => logs.filter(
    log => log.level === 'error' || log.level === 'fatal',
  ), [logs]);

  return (
    <View style={styles.list}>
      {warnings.length > 0 && (
        <LogBoxLogNotification
          log={warnings[warnings.length - 1]}
          level="warn"
          totalLogCount={warnings.length}
          onPressOpen={() => openLog(warnings[warnings.length - 1])}
          onPressDismiss={onDismissWarns}
        />
      )}
      {errors.length > 0 && (
        <LogBoxLogNotification
          log={errors[errors.length - 1]}
          level="error"
          totalLogCount={errors.length}
          onPressOpen={() => openLog(errors[errors.length - 1])}
          onPressDismiss={onDismissErrors}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    bottom: 20,
    left: 10,
    right: 10,
    position: 'absolute',
    maxWidth: 320,
  },
});

export default (LogBoxData.withSubscription(
  _LogBoxNotificationContainer,
));
