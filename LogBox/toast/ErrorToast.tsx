/**
 * Copyright (c) Evan Bacon.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import * as LogBoxData from '../Data/LogBoxData';
import { LogBoxLog } from '../Data/LogBoxLog';
import { LogBoxMessage } from '../UI/LogBoxMessage';
import * as LogBoxStyle from '../UI/LogBoxStyle';


import type { Message as MessageType } from "../Data/parseLogBoxLog";
type Props = {
  log: LogBoxLog;
  totalLogCount: number;
  level: "warn" | "error";
  onPressOpen: () => void;
  onPressDismiss: () => void;
};

export function ErrorToast(props: Props) {
  const { totalLogCount, level, log } = props;

  // Eagerly symbolicate so the stack is available when pressing to inspect.
  useEffect(() => {
    LogBoxData.symbolicateLogLazy("stack", log);
    LogBoxData.symbolicateLogLazy("component", log);
  }, [log]);

  return (
    <View style={toastStyles.container}>
      <Pressable style={{ flex: 1 }} onPress={props.onPressOpen}>
        {({ hovered, pressed }) => (
          <View
            style={[
              toastStyles.press,
              {
                transitionDuration: "150ms",
                backgroundColor: pressed
                  ? "#323232"
                  : hovered
                    ? "#111111"
                    : "black",
              },
            ]}
          >
            <Count count={totalLogCount} level={level} />
            <Message message={log.message} />
            <Dismiss onPress={props.onPressDismiss} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

function Count({ count, level }: { count: number; level: "error" | "warn" }) {
  return (
    <View style={[countStyles.inside, countStyles[level]]}>
      <Text style={countStyles.text}>{count <= 1 ? "!" : count}</Text>
    </View>
  );
}

function Message({ message }: { message?: MessageType }) {
  return (
    <Text numberOfLines={1} selectable={false} style={messageStyles.text}>
      {message && (
        <LogBoxMessage
          plaintext
          message={message}
          style={messageStyles.substitutionText}
        />
      )}
    </Text>
  );
}

function Dismiss({ onPress }: { onPress: () => void }) {
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
        <View
          style={[
            dismissStyles.press,
            hovered && { opacity: 0.8 },
            pressed && { opacity: 0.5 },
          ]}
        >
          <Image
            source={require("../UI/LogBoxImages/close.png")}
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
  inside: {
    marginRight: 8,
    minWidth: 22,
    aspectRatio: 1,
    paddingHorizontal: 4,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: LogBoxStyle.getTextColor(1),
    fontSize: 14,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
    textShadowColor: LogBoxStyle.getBackgroundColor(0.8),
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});

const messageStyles = StyleSheet.create({
  text: {
    paddingLeft: 8,
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
  press: {
    backgroundColor: "#323232",
    height: 20,
    width: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 8,
    width: 8,
  },
});

const toastStyles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: "center",
    marginBottom: 4,
  },
  press: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#323232",
    backgroundColor: "black",
    flex: 1,
    paddingHorizontal: 12,
  },
});
