import React from "react";
import { StyleSheet, TouchableOpacity ,Text, GestureResponderEvent} from "react-native";

interface Props  {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined
};

export default function Link({text,onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: "#8c99de",
    marginLeft: 5,
  },
});
