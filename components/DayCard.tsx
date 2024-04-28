import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  filled: boolean; // Define possible background colors
  active: boolean; // Define possible border colors
  dayOfWeek: string;
  date: string | number;
  onSelect: () => void;
}

const DayCard: React.FC<Props> = ({ filled, active, dayOfWeek, date,onSelect }) => {
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
      marginHorizontal:3,
      // marginLeft:20
    },
    dayOfWeekText: {
      flex: 0,
      fontSize: 12,
      fontFamily: 'Inter-Bold',
      color: !active && !filled ? "#9AA5B5" : active && !filled ? "#9AA5B5": "white",
    },
    dateText: {
      flex: 0,
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: !active && !filled ? "#353535" : active && !filled ? "#353535": "white",
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Text style={styles.dayOfWeekText}>{dayOfWeek}</Text>
      <Text style={styles.dateText}>{date}</Text>
    </TouchableOpacity>
  );
};

export default DayCard;
