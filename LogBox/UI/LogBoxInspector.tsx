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
import { LogBoxInspectorCodeFrame } from './LogBoxInspectorCodeFrame';
import { LogBoxInspectorFooter } from './LogBoxInspectorFooter';
import { LogBoxInspectorHeader } from './LogBoxInspectorHeader';
import { LogBoxInspectorMessageHeader } from './LogBoxInspectorMessageHeader';
import { LogBoxInspectorReactFrames } from './LogBoxInspectorReactFrames';
import { LogBoxInspectorStackFrames } from './LogBoxInspectorStackFrames';
import * as LogBoxStyle from './LogBoxStyle';


type Props = {
  onDismiss: () => void,
  onChangeSelectedIndex: (index: number) => void,
  onMinimize: () => void,
  logs: readonly LogBoxLog[],
  selectedIndex: number,
  fatalType?: LogLevel,
}

export function LogBoxInspector(props: Props) {
  const { logs, selectedIndex } = props;
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
        onSelectIndex={props.onChangeSelectedIndex}
        selectedIndex={selectedIndex}
        total={logs.length}
        level={log.level}
      />
      <LogBoxInspectorBody log={log} onRetry={_handleRetry} />
      <LogBoxInspectorFooter
        onDismiss={props.onDismiss}
        onMinimize={props.onMinimize}
        level={log.level}
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
  props: Partial<{ log: LogBoxLog, onRetry: (type: StackType) => void }>,
) {
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    setCollapsed(true);
  }, [props.log]);

  const headerTitle =
    props.log.type ??
    headerTitleMap[props.log.isComponentError ? 'component' : props.log.level];

  const header = (
    <LogBoxInspectorMessageHeader
      collapsed={collapsed}
      onPress={() => setCollapsed(!collapsed)}
      message={props.log.message}
      level={props.log.level}
      title={headerTitle}
    />
  )

  const content = (<>
    <LogBoxInspectorCodeFrame codeFrame={props.log.codeFrame} />
    {/* <LogBoxInspectorReactFrames log={props.log} /> */}
    <LogBoxInspectorStackFrames type='stack' log={props.log} onRetry={props.onRetry.bind(props.onRetry, 'stack')} />
    {props.log?.componentStack?.length && <LogBoxInspectorStackFrames type='component' log={props.log} onRetry={props.onRetry.bind(props.onRetry, 'component')} />}
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

