import React from "react";
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity } from "react-native";

type CategoryProps = {
  title: string;
  iconUri: string;
  backgroundColor: string;
};

const TaskCategory: React.FC<CategoryProps> = ({ title, iconUri, backgroundColor }) => (
  <View style={[styles.categoryContainer, { backgroundColor }]}>
    {/* {iconUri && <Image resizeMode="contain" source={{ uri: iconUri }} style={styles.categoryIcon} />} */}
    <Text style={styles.categoryText}>{title}</Text>
  </View>
);

const TaskCategories: React.FC = ({onClose,onOpen}) => {
  const categories = [
    { title: '📗 Study', iconUri: 'iconUriHere', backgroundColor: 'rgba(141, 153, 222, 1)' },
    { title: '💤 Sleep', iconUri: 'iconUriHere', backgroundColor: 'rgba(255, 202, 101, 0.47)' },
    { title: '🏋️ Gym', iconUri: 'iconUriHere', backgroundColor: 'rgba(19, 206, 102, 0.29)' },
    { title: '🥳 Chill', iconUri: 'iconUriHere', backgroundColor: 'rgba(254, 181, 166, 0.34)' },
    { title: '🏋️ Exercise', iconUri: 'iconUriHere', backgroundColor: 'rgba(227, 72, 80, 0.21)' },
    // Duplicate categories as requested
    { title: '💤 Sleep', iconUri: 'iconUriHere', backgroundColor: 'rgba(255, 202, 101, 0.47)' },
    { title: '🏋️ Exercise', iconUri: 'iconUriHere', backgroundColor: 'rgba(227, 72, 80, 0.21)' },
    { title: '📗 Study', iconUri: 'iconUriHere', backgroundColor: 'rgba(141, 153, 222, 1)' },
    { title: '🏋️ Gym', iconUri: 'iconUriHere', backgroundColor: 'rgba(19, 206, 102, 0.29)' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => onClose() } >
        <Image resizeMethod="auto" source={require('../assets/icons/back.png')} style={styles.headerIcon} />

        </TouchableOpacity>
        <Text style={styles.headerText}>Schedule a Task</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.goalTitle}>Task goal</Text>
        <Text style={styles.goalDescription}>Track how you spend your time</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TaskCategory
            key={index}
            title={category.title}
            iconUri={category.iconUri}
            backgroundColor={category.backgroundColor}
          />
        ))}
      </View>
      <TouchableOpacity onPress={() => {
        onClose()
        onOpen()
      }} style={styles.button}>
        <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap:20
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
  },
  contentContainer: {
    marginBottom: 48,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  goalDescription: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    marginTop: 8,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
    columnGap:6,
  },
  categoryContainer: {
    padding: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    width: 20,
    height: 20,
  },
  categoryText: {
    fontFamily: "Inter-Medium",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginTop: 48,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default TaskCategories;
