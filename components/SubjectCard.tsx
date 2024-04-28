import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SubjectProps {
  title: string;
  items: {text:string;bg:"#FEB5A625" | "#8D99DE30" | "#FFCA6535" | "#13CE6630"}[];
  dueDate: string;
  dueTime: string;
  bgColor: string;
  borderColor: string;
}

export const SubjectCard: React.FC<SubjectProps> = ({
  title,
  items,
  dueDate,
  dueTime,
  bgColor,
  borderColor,
}) => {
  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={[styles.header, { backgroundColor: bgColor }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        {items.map(({text,bg}, index) => (
          <View key={index} style={styles.subItem}>
            <View style={[styles.subItemBox,{backgroundColor:bg}]}>
              <Text style={[styles.subItemTitle,{color:bg.slice(0,-2)}]}>{text}</Text>
            </View>
            <View style={styles.subItemDetails}>
              <Text style={[styles.subItemText,{color:"#E34850", fontWeight:"bold"}]}>Due On:</Text>
              <Text style={styles.subItemText}>{dueDate}</Text>
              <Text style={styles.subItemText}>{dueTime}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: "hidden",
    paddingBottom: 18,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 10,
    gap:16,
  },
  header: {
    height:44,
    alignSelf: 'stretch', // Make header fill the container horizontally
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: 36,
    paddingVertical: 2.5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    textAlign: "left",
    color: "white",
  },
  content: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "stretch",
    paddingHorizontal: 18,
    gap:24,
  },
  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    width: 348,
  },
  subItemBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  subItemTitle: {
    flexGrow: 0,
    flexShrink: 0,
    fontSize: 12,
    fontFamily: 'Inter-Bold',
    textAlign: "left",
  },
  subItemDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 3,
    gap:12,
  },
  subItemText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
});
