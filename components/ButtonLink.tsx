import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function ButtonLink() {
  return (
    <View
      style={{
        display: "flex",
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        gap: 6,
      }}
    >
      <Text style={[styles.plus]}>+</Text>
      <Text style={styles.text}>Add Custom Courses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  plus: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#8d99de",
  },
  text: { fontSize: 14, textAlign: "center", color: "#8d99de" },
});
