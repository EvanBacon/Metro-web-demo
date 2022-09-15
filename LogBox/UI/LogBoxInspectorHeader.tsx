/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native';

import { LogBoxButton } from './LogBoxButton';
import * as LogBoxStyle from './LogBoxStyle';

import type { LogLevel } from '../Data/LogBoxLog';

type Props = {
  onSelectIndex: (selectedIndex: number) => void,
  selectedIndex: number,
  total: number,
  level: LogLevel,
}

export function LogBoxInspectorHeader(props: Props) {
  if (props.level === 'syntax') {
    return (
      <View style={[styles.safeArea, styles[props.level]]}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Failed to compile</Text>
          </View>
        </View>
      </View>
    );
  }

  const prevIndex =
    props.selectedIndex - 1 < 0 ? props.total - 1 : props.selectedIndex - 1;
  const nextIndex =
    props.selectedIndex + 1 > props.total - 1 ? 0 : props.selectedIndex + 1;

  const titleText = `Log ${props.selectedIndex + 1} of ${props.total}`;

  return (
    <View style={[styles.safeArea, styles[props.level]]}>
      <View style={styles.header}>
        <LogBoxInspectorHeaderButton
          disabled={props.total <= 1}
          level={props.level}
          image={require('./LogBoxImages/chevron-left.png')}
          onPress={() => props.onSelectIndex(prevIndex)}
        />
        <View style={styles.title}>
          <Text style={styles.titleText}>{titleText}</Text>
        </View>
        <LogBoxInspectorHeaderButton
          disabled={props.total <= 1}
          level={props.level}
          image={require('./LogBoxImages/chevron-right.png')}
          onPress={() => props.onSelectIndex(nextIndex)}
        />
      </View>
    </View>
  );
}

const backgroundForLevel = (level: LogLevel) =>
({
  warn: {
    default: 'transparent',
    pressed: LogBoxStyle.getWarningDarkColor(),
  },
  error: {
    default: 'transparent',
    pressed: LogBoxStyle.getErrorDarkColor(),
  },
  fatal: {
    default: 'transparent',
    pressed: LogBoxStyle.getFatalDarkColor(),
  },
  syntax: {
    default: 'transparent',
    pressed: LogBoxStyle.getFatalDarkColor(),
  },
}[level]);

function LogBoxInspectorHeaderButton(
  props: {
    disabled: boolean,
    image: number,
    level: LogLevel,
    onPress?: () => void,
  }
) {
  return (
    <LogBoxButton
      backgroundColor={backgroundForLevel(props.level)}
      onPress={props.disabled ? null : props.onPress}
      style={headerStyles.button}>
      {props.disabled ? null : (
        <Image source={props.image} style={headerStyles.buttonImage} />
      )}
    </LogBoxButton>
  );
}

const headerStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    aspectRatio: 1,
    justifyContent: 'center',
    marginTop: 5,
    marginRight: 6,
    marginLeft: 6,
    marginBottom: Platform.select({
      web: 0,
      default: -8
    }),
    borderRadius: 3,
  },
  buttonImage: {
    height: 14,
    width: 8,
    tintColor: LogBoxStyle.getTextColor(),
  },
});

const styles = StyleSheet.create({
  syntax: {
    backgroundColor: LogBoxStyle.getFatalColor(),
  },
  fatal: {
    backgroundColor: LogBoxStyle.getFatalColor(),
  },
  warn: {
    backgroundColor: LogBoxStyle.getWarningColor(),
  },
  error: {
    backgroundColor: LogBoxStyle.getErrorColor(),
  },
  header: {
    flexDirection: 'row',
    height: Platform.select({
      default: 48,
      ios: 44,
    }),
  },
  title: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: LogBoxStyle.getTextColor(),
    fontSize: 16,
    fontWeight: '600',
    includeFontPadding: false,
    lineHeight: 20,
  },
  safeArea: {
    paddingTop: Platform.OS !== 'ios' ? StatusBar.currentHeight : 40,
  },
});