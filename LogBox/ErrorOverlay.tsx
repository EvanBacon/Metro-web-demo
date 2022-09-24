/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useCallback, useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';

import * as LogBoxData from './Data/LogBoxData';
import { LogBoxLog, StackType } from './Data/LogBoxLog';
import { useLogs, useSelectedLog } from './Data/LogContext';
import { LogBoxInspectorCodeFrame } from './UI/LogBoxInspectorCodeFrame';
import { LogBoxInspectorFooter } from './UI/LogBoxInspectorFooter';
import { LogBoxInspectorHeader } from './UI/LogBoxInspectorHeader';
import { LogBoxInspectorMessageHeader } from './UI/LogBoxInspectorMessageHeader';
import { LogBoxInspectorStackFrames } from './UI/LogBoxInspectorStackFrames';
import * as LogBoxStyle from './UI/LogBoxStyle';

// import { LogBoxInspectorReactFrames } from './LogBoxInspectorReactFrames';
export function LogBoxInspectorContainer() {
    const { selectedLogIndex, logs } = useLogs()
    const log = logs[selectedLogIndex];
    if (log == null) {
        return null;
    }
    return <LogBoxInspector log={log} selectedLogIndex={selectedLogIndex} logs={logs} />;
}
export function LogBoxInspector({ log, selectedLogIndex, logs }: { log: LogBoxLog, selectedLogIndex: number, logs: LogBoxLog[] }) {

    const onDismiss = useCallback((): void => {
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
    }, [selectedLogIndex]);

    const onMinimize = useCallback((): void => {
        LogBoxData.setSelectedLog(-1);
    }, []);

    const onChangeSelectedIndex = useCallback((index: number): void => {
        LogBoxData.setSelectedLog(index);
    }, []);

    useEffect(() => {
        if (log) {
            LogBoxData.symbolicateLogNow('stack', log);
            LogBoxData.symbolicateLogNow('component', log);
        }
    }, [log]);

    useEffect(() => {
        // Optimistically symbolicate the last and next logs.
        if (logs.length > 1) {
            const selected = selectedLogIndex;
            const lastIndex = logs.length - 1;
            const prevIndex = selected - 1 < 0 ? lastIndex : selected - 1;
            const nextIndex = selected + 1 > lastIndex ? 0 : selected + 1;
            for (const type of ['component', 'stack'] as const) {
                LogBoxData.symbolicateLogLazy(type, logs[prevIndex]);
                LogBoxData.symbolicateLogLazy(type, logs[nextIndex]);
            }
        }
    }, [logs, selectedLogIndex]);

    useEffect(() => {
        Keyboard.dismiss();
    }, []);

    const _handleRetry = useCallback((type: StackType) => {
        LogBoxData.retrySymbolicateLogNow(type, log);
    }, [log]);

    return (
        <View style={styles.root}>
            <LogBoxInspectorHeader
                onSelectIndex={onChangeSelectedIndex}
                level={log.level}
            />
            <LogBoxInspectorBody onRetry={_handleRetry} />
            <LogBoxInspectorFooter
                onDismiss={onDismiss}
                onMinimize={onMinimize}
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
        {!!log?.componentStack?.length && <LogBoxInspectorStackFrames type='component' onRetry={onRetry.bind(onRetry, 'component')} />}
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: LogBoxStyle.getTextColor(),
    },
    scrollBody: {
        backgroundColor: LogBoxStyle.getBackgroundColor(0.9),
        flex: 1,
    },
});

export default (LogBoxData.withSubscription(
    LogBoxInspectorContainer,
));