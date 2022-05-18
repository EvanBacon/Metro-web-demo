/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import * as LogBoxStyle from './LogBoxStyle';

// import type { ViewStyleProp } from '../../StyleSheet/StyleSheet';
// import type { PressEvent } from '../../Types/CoreEventTypes';

// TODO: This
type ViewStyleProp = any;
type PressEvent = any;
type EdgeInsetsPropType = any;

type Props = {
  backgroundColor: {
    default: string,
    pressed: string,
  },
  children?: any,
  hitSlop?: EdgeInsetsPropType,
  onPress?: (event: PressEvent) => void,
  style?: ViewStyleProp,
};

function LogBoxButton(props: Props) {
  const [pressed, setPressed] = React.useState(false);

  let backgroundColor = props.backgroundColor;
  if (!backgroundColor) {
    backgroundColor = {
      default: LogBoxStyle.getBackgroundColor(0.95),
      pressed: LogBoxStyle.getBackgroundColor(0.6),
    };
  }

  const content = (
    <View
      style={StyleSheet.compose(
        {
          backgroundColor: pressed
            ? backgroundColor.pressed
            : backgroundColor.default,
        },
        props.style,
      )}>
      {props.children}
    </View>
  );

  return props.onPress == null ? (
    content
  ) : (
    <TouchableWithoutFeedback
      hitSlop={props.hitSlop}
      onPress={props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      {content}
    </TouchableWithoutFeedback>
  );
}

export default LogBoxButton;
