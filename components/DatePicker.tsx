import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React, { useRef, useState } from "react";

const DatePicker = ({
  placeholder,
  icon,
}: {
  placeholder: string;
  icon: any;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{placeholder}</Text>
      <Image source={icon} style={styles.icon} />
    </View>
  );
};
export default DatePicker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#9AA5B5",
    height: 40,
    paddingHorizontal: 6,
    borderRadius: 20,
  },

  icon: {
    width: 30,
    height: 30,
    alignSelf: "center",
  },
  text: {
    flexDirection: "row",
    fontSize: 12,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    color: "#9AA5B5",
  },

});
