import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface DateInfoProps {
  label: string;
  value: string;
}

const DateInfo: React.FC<DateInfoProps> = ({ label, value }) => {
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Text style={styles.dateValue}>{value}</Text>
    </View>
  );
};

const Today: React.FC = () => {
  return (
    <View style={styles.container}>
      <DateInfo label="Today" value="16 March 2024" />
      <Image
        resizeMode="cover"
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.iconImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection:"row",
    alignSelf:"stretch",
    justifyContent:"space-between",
    padding: 20,
    gap: 20,
    letterSpacing: 1,
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  dateLabel: {
    color: "#828188",
    fontSize: 14,
    marginBottom: 10,
  },
  dateValue: {
    color: "#27272A",
    fontSize: 16,
  },
  iconImage: {
    width: 38,
    height: 38,
    marginTop: 20,
  },
});

export default Today;
