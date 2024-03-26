import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  filled: boolean; // Define possible background colors
  active: boolean; // Define possible border colors
  dayOfWeek: string;
  date: string | number;
}

const DayCard: React.FC<Props> = ({ filled, active, dayOfWeek, date }) => {
  // Define dynamic styles based on props
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      gap: 12,
      height: 72,
      width: 45,
      borderRadius: 10,
      backgroundColor: filled ? "#8D99DE" : "#FFFFFF",
      borderColor: active ? "#8D99DE" : "#FFFFFF",
      borderWidth: 1,
    },
    dayOfWeekText: {
      flex: 0,
      fontSize: 12,
      fontWeight: "bold",
      color: !active && !filled ? "#9AA5B5" : active && !filled ? "#9AA5B5": "white",
    },
    dateText: {
      flex: 0,
      fontSize: 20,
      fontWeight: "bold",
      color: !active && !filled ? "#353535" : active && !filled ? "#353535": "white",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </View>
  );
};

export default DayCard;
