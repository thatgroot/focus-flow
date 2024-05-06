import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type CategoryProps = {
  title: string;
  icon: string;
  backgroundColor: string;
  onSelect:(text:string) =>void,
  active:boolean
};

export const Chip: React.FC<CategoryProps> = ({
  title,
  icon,
  backgroundColor,
  onSelect,
  active
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onSelect(title)
      }}
      style={[
        styles.badge,
        {
          backgroundColor,
          borderWidth: 1,
          borderColor: active ? "#8D99DE" : "white",
        },
      ]}
    >
      <Text style={styles.text}>{icon}</Text>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontFamily: "Inter-Medium",
  },
});
