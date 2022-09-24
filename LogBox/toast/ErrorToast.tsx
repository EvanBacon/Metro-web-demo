/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Message as MessageType } from '../Data/parseLogBoxLog';
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LogBoxButton } from '../UI/LogBoxButton';
import * as LogBoxStyle from '../UI/LogBoxStyle';
import { LogBoxLog } from '../Data/LogBoxLog';
import { LogBoxMessage } from '../UI/LogBoxMessage';
import * as LogBoxData from '../Data/LogBoxData';

type Props = {
  log: LogBoxLog,
  totalLogCount: number,
  level: 'warn' | 'error',
  onPressOpen: () => void,
  onPressDismiss: () => void,
}

export function ErrorToast(props: Props) {
  const { totalLogCount, level, log } = props;

  // Eagerly symbolicate so the stack is available when pressing to inspect.
  useEffect(() => {
    LogBoxData.symbolicateLogLazy('stack', log);
    LogBoxData.symbolicateLogLazy('component', log);
  }, [log]);

  return (
    <View style={toastStyles.container}>
      <LogBoxButton
        onPress={props.onPressOpen}
        style={toastStyles.press}
        backgroundColor={{
          default: LogBoxStyle.getBackgroundColor(1),
          pressed: LogBoxStyle.getBackgroundColor(0.9),
        }}>
        <View style={toastStyles.content}>
          <CountBadge count={totalLogCount} level={level} />
          <Message message={log.message} />
          <DismissButton onPress={props.onPressDismiss} />
        </View>
      </LogBoxButton>
    </View>
  );
}

function CountBadge(
  { count, level }: { count: number, level: 'error' | 'warn' },
) {
  return (
    <View style={countStyles.outside}>
      <View style={[countStyles.inside, countStyles[level]]}>
        <Text style={countStyles.text}>
          {count <= 1 ? '!' : count}
        </Text>
      </View>
    </View>
  );
}

function Message({ message }: { message?: MessageType }) {
  return (
    <View style={messageStyles.container}>
      <Text numberOfLines={1} style={messageStyles.text}>
        {message && (
          <LogBoxMessage
            plaintext
            message={message}
            style={messageStyles.substitutionText}
          />
        )}
      </Text>
    </View>
  );
}

function DismissButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      style={{
        marginLeft: 5,
      }}
      hitSlop={{
        top: 12,
        right: 10,
        bottom: 12,
        left: 10,
      }}
      onPress={onPress}
    >
      {({ hovered, pressed }) => (
        <View style={[dismissStyles.press, hovered && { opacity: 0.8 }, pressed && { opacity: 0.5 }]}>
          <Image
            source={require('../UI/LogBoxImages/close.png')}
            style={dismissStyles.image}
          />
        </View>
      )}
    </Pressable>

  );
}

const countStyles = StyleSheet.create({
  warn: {
    backgroundColor: LogBoxStyle.getWarningColor(1),
  },
  error: {
    backgroundColor: LogBoxStyle.getErrorColor(1),
  },
  log: {
    backgroundColor: LogBoxStyle.getLogColor(1),
  },
  outside: {
    padding: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  inside: {
    minWidth: 18,
    paddingLeft: 4,
    paddingRight: 4,
    borderRadius: 25,
    fontWeight: '600',
  },
  text: {
    color: LogBoxStyle.getTextColor(1),
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: LogBoxStyle.getBackgroundColor(0.4),
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});

const messageStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    borderLeftColor: LogBoxStyle.getTextColor(0.2),
    borderLeftWidth: 1,
    paddingLeft: 8,
  },
  text: {
    color: LogBoxStyle.getTextColor(1),
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  substitutionText: {
    color: LogBoxStyle.getTextColor(0.6),
  },
});

const dismissStyles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
    marginLeft: 5,
  },
  press: {
    backgroundColor: LogBoxStyle.getTextColor(0.3),
    height: 20,
    width: 20,
    borderRadius: 25,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 8,
    width: 8,
  },
});

const toastStyles = StyleSheet.create({
  container: {
    height: 48,
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 4,
  },
  press: {
    height: 48,
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    marginTop: 0.5,
    paddingHorizontal: 12,
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 'auto',
  },
});
