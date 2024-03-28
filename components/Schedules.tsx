import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Schedules = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: "#feb5a6" }]}>
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>3</Text>
          </View>
          <Text style={styles.title}>Sociology | Lecture</Text>
        </View>
        <View style={styles.details}>
          <Text style={styles.detailText}>2h 30 Mins</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: "#9aa5b525" }]}>
        <View style={styles.item}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>3</Text>
          </View>
          <Text style={[styles.title, { color: "#353535" }]}>
            Sociology | Lecture
          </Text>
        </View>
        <View style={styles.details}>
          <Text style={[styles.detailText, { color: "#353535" }]}>
            2h 30 Mins
          </Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: "#8d99de" ,gap:24,}]}>
        {["Planned Study", "Phsycology", "Economics"].map((subject, index) => (
          <View key={index} style={{ ...styles.item, flexDirection: "column",gap:2 }}>
            <Text style={styles.subtitle}>{subject}</Text>
            <View style={styles.subDetails}>
              <View style={styles.subDetail}>
                <View
                  style={[
                    styles.subDetailBox,
                    { backgroundColor: "rgba(0, 0, 0, 0.28)" },
                  ]}
                >
                  <Text style={styles.subDetailText}>Use: 2h 30m</Text>
                </View>
              </View>
              <View style={styles.subDetail}>
                <View
                  style={[
                    styles.subDetailBox,
                    { backgroundColor: "#e3485020" },
                  ]}
                >
                  <Text style={[styles.subDetailText, { color: "#fff" }]}>
                    Due: Nov 20
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
  },
  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    minWidth:275,
    gap:12,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    height: 25,
    width: 25,
    borderRadius: 1000,
    backgroundColor: "#8d99de",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    flexShrink: 1,
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
  },
  detailText: {
    fontSize: 12,
    color: "white",
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    width: "100%",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  subDetail: {
    marginRight: 10,
  },
  subDetailBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  subDetailText: {
    fontSize: 12,
    color: "white",
  },
});
