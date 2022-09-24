/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import * as LogBoxData from '../Data/LogBoxData';
import { LogBoxLog, LogLevel, StackType } from '../Data/LogBoxLog';
import { useLogs, useSelectedLog } from '../Data/LogContext';
import { LogBoxInspectorCodeFrame } from './LogBoxInspectorCodeFrame';
import { LogBoxInspectorFooter } from './LogBoxInspectorFooter';
import { LogBoxInspectorHeader } from './LogBoxInspectorHeader';
import { LogBoxInspectorMessageHeader } from './LogBoxInspectorMessageHeader';
// import { LogBoxInspectorReactFrames } from './LogBoxInspectorReactFrames';
import { LogBoxInspectorStackFrames } from './LogBoxInspectorStackFrames';
import * as LogBoxStyle from './LogBoxStyle';


type Props = {
  onDismiss: () => void,
  onChangeSelectedIndex: (index: number) => void,
  onMinimize: () => void,
  fatalType?: LogLevel,
}

export function LogBoxInspector(props: Props) {
  const { selectedLogIndex: selectedIndex, logs } = useLogs()


  const { onChangeSelectedIndex } = props;
  let log = logs[selectedIndex];

  useEffect(() => {
    if (log) {
      LogBoxData.symbolicateLogNow('stack', log);
      LogBoxData.symbolicateLogNow('component', log);
    }
  }, [log]);

  useEffect(() => {
    // Optimistically symbolicate the last and next logs.
    if (logs.length > 1) {
      const selected = selectedIndex;
      const lastIndex = logs.length - 1;
      const prevIndex = selected - 1 < 0 ? lastIndex : selected - 1;
      const nextIndex = selected + 1 > lastIndex ? 0 : selected + 1;
      for (const type of ['component', 'stack'] as const) {
        LogBoxData.symbolicateLogLazy(type, logs[prevIndex]);
        LogBoxData.symbolicateLogLazy(type, logs[nextIndex]);
      }
    }
  }, [logs, selectedIndex]);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  const _handleRetry = useCallback((type: StackType) => {
    LogBoxData.retrySymbolicateLogNow(type, log);
  }, [log]);

  if (log == null) {
    return null;
  }

  return (
    <View style={styles.root}>
      <LogBoxInspectorHeader
        onSelectIndex={onChangeSelectedIndex}
        level={log.level}
      />
      <LogBoxInspectorBody onRetry={_handleRetry} />
      <LogBoxInspectorFooter
        onDismiss={props.onDismiss}
        onMinimize={props.onMinimize}
      />
    </View>
  );
}

const headerTitleMap = {
  warn: 'Console Warning',
  error: 'Console Error',
  fatal: 'Uncaught Error',
  syntax: 'Syntax Error',
  component: 'Render Error',
};

function LogBoxInspectorBody(
  { onRetry }: { onRetry: (type: StackType) => void },
) {
  const log = useSelectedLog();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [log]);

  const headerTitle =
    log.type ??
    headerTitleMap[log.isComponentError ? 'component' : log.level];

  const header = (
    <LogBoxInspectorMessageHeader
      collapsed={collapsed}
      onPress={() => setCollapsed(!collapsed)}
      message={log.message}
      level={log.level}
      title={headerTitle}
    />
  )

  const content = (<>
    <LogBoxInspectorCodeFrame codeFrame={log.codeFrame} />
    {/* <LogBoxInspectorReactFrames log={log} /> */}
    <LogBoxInspectorStackFrames type='stack' onRetry={onRetry.bind(onRetry, 'stack')} />
    {log?.componentStack?.length && <LogBoxInspectorStackFrames type='component' onRetry={onRetry.bind(onRetry, 'component')} />}
  </>)


  if (collapsed) {
    return (
      <>
        {header}
        <ScrollView style={styles.scrollBody}>
          {content}
        </ScrollView>
      </>
    );
  }
  return (
    <ScrollView style={styles.scrollBody}>
      {header}
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: LogBoxStyle.getTextColor(),
  },
  scrollBody: {
    backgroundColor: LogBoxStyle.getBackgroundColor(0.9),
    flex: 1,
  },
});

