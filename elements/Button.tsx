import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";

interface Props {
  text: string;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  disabled: boolean;
}

export default function Button({ text, onPress, disabled=false }: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 280,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#8a97dd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#fff",
  },
});
