import { Image } from "expo-image";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";

interface TimeEntryProps {
  timestamp: string;
  duration: string;
  onPress?: (event: GestureResponderEvent) => void;
  type: "recent" | "upcomming";
}

const TimeEntry: React.FC<TimeEntryProps> = ({
  timestamp,
  duration,
  onPress,
  type,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: type === "recent" ? "#FEB5A610" : "#13CE6625",
      }}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.dot} />
          <Text
            style={{
              ...styles.duration,
              color: type === "upcomming" ? "#13ce66" : "#FEB5A6",
            }}
          >
            {duration}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            width: 12,
            height: 18,
          }}
          source={require("@/assets/icons/next.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    width: "100%",
    maxWidth: 325,
    borderRadius: 12,
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 8,
  },
  timestamp: {
    fontSize: 13,
    color: "#5b5b5b",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 3.87,
    height: 3.87,
    borderRadius: 3,
    backgroundColor: "#13ce66",
  },
  duration: {
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default TimeEntry;
