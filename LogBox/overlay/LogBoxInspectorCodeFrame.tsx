/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import openFileInEditor from '../modules/openFileInEditor';
import * as LogBoxData from '../Data/LogBoxData';
import { Ansi } from '../UI/AnsiHighlight';
import { CODE_FONT } from '../UI/constants';
import { LogBoxButton } from '../UI/LogBoxButton';
import { LogBoxInspectorSection } from './LogBoxInspectorSection';
import * as LogBoxStyle from '../UI/LogBoxStyle';

import type { CodeFrame } from '../Data/parseLogBoxLog';
import { formatProjectFileName } from '../formatProjectFilePath';

export function LogBoxInspectorCodeFrame(props: {
  codeFrame?: CodeFrame,
}) {
  const codeFrame = props.codeFrame;
  if (codeFrame == null) {
    return null;
  }

  function getFileName() {
    return formatProjectFileName(codeFrame.fileName);
  }

  function getLocation() {
    const location = codeFrame.location;
    if (location != null) {
      return ` (${location.row}:${location.column + 1 /* Code frame columns are zero indexed */
        })`;
    }

    return null;
  }

  return (
    <LogBoxInspectorSection heading="Source" action={<AppInfo />}>
      <View style={styles.box}>
        <View style={styles.frame}>
          <ScrollView horizontal>
            <Ansi style={styles.content} text={codeFrame.content} />
          </ScrollView>
        </View>
        <LogBoxButton
          backgroundColor={{
            default: 'transparent',
            pressed: LogBoxStyle.getBackgroundDarkColor(1),
          }}
          style={styles.button}
          onPress={() => {
            openFileInEditor(codeFrame.fileName, codeFrame.location?.row ?? 0);
          }}>
          <Text selectable={false} style={styles.fileText}>
            {getFileName()}
            {getLocation()}
          </Text>
        </LogBoxButton>
      </View>
    </LogBoxInspectorSection>
  );
}

function AppInfo() {
  const appInfo = LogBoxData.getAppInfo();
  if (appInfo == null) {
    return null;
  }

  return (
    <LogBoxButton
      backgroundColor={{
        default: 'transparent',
        pressed: appInfo.onPress
          ? LogBoxStyle.getBackgroundColor(1)
          : 'transparent',
      }}
      style={appInfoStyles.buildButton}
      onPress={appInfo.onPress}>
      <Text style={appInfoStyles.text}>
        {appInfo.appVersion} ({appInfo.engine})
      </Text>
    </LogBoxButton>
  );
}

const appInfoStyles = StyleSheet.create({
  text: {
    color: LogBoxStyle.getTextColor(0.4),
    fontSize: 12,
    lineHeight: 12,
  },
  buildButton: {
    flex: 0,
    flexGrow: 0,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: -8,
  },
});

const styles = StyleSheet.create({
  box: {
    backgroundColor: LogBoxStyle.getBackgroundColor(),
    borderWidth: 1,
    borderColor: "#323232",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 3,
  },
  frame: {
    padding: 10,
    borderBottomColor: LogBoxStyle.getTextColor(0.1),
    borderBottomWidth: 1,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  content: {
    color: LogBoxStyle.getTextColor(1),
    fontSize: 12,
    includeFontPadding: false,
    lineHeight: 20,
    fontFamily: CODE_FONT,
  },
  fileText: {
    color: LogBoxStyle.getTextColor(0.5),
    textAlign: 'center',
    flex: 1,
    fontSize: 16,
    includeFontPadding: false,
    fontFamily: CODE_FONT,
  },
});


