import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

interface AssignmentProps {
  title: string;
  dueDate: string;
}

const AssignmentReminder: React.FC<AssignmentProps> = ({ title, dueDate }) => (
  <View style={styles.assignmentContainer}>
    <View style={styles.assignmentTitleContainer}>
      <Text style={styles.assignmentTitle}>{title}</Text>
    </View>
    <View style={styles.dueDateContainer}>
      <Text style={styles.dueDate}>{dueDate}</Text>
    </View>
  </View>
);

const ReminderNotification: React.FC = () => {
  const assignments: AssignmentProps[] = [
    {
      title: "Your Biology Assignment is due on:",
      dueDate: "27-January-2024 at 09:00 PM",
    },
    {
      title: "Your Math Assignment is due on:",
      dueDate: "30-January-2024 at 11:00 AM",
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={{ uri: "imageURI" }}
        style={styles.image}
      />
      <View style={styles.reminderContainer}>
        <Text style={styles.reminderTitle}>Reminder focus flow</Text>
        {assignments.map((assignment, index) => (
          <AssignmentReminder
            key={index}
            title={assignment.title}
            dueDate={assignment.dueDate}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    display: "flex",
    gap: 10,
    fontSize: 14,
    letterSpacing: 1,
    padding: 13,
  },
  image: {
    alignSelf: "center",
    width: 100,
  },
  reminderContainer: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
  },
  reminderTitle: {
    color: "#27272A",
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 10,
  },
  assignmentContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
  },
  assignmentTitleContainer: {},
  assignmentTitle: {
    color: "#000000",
    fontWeight: "400",
    fontSize: 16,
  },
  dueDateContainer: {},
  dueDate: {
    color: "#E34850",
    fontWeight: "400",
    fontSize: 16,
  },
});

export default ReminderNotification;
