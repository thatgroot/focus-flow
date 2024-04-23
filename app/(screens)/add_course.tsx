import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';

type Course = {
  id: string;
  title: string;
};

const courses: Course[] = [
  { id: "1", title: "Psychology" },
  { id: "2", title: "Sociology" },
  { id: "3", title: "Biology" },
  { id: "4", title: "Physics" },
  { id: "5", title: "Mathematics" },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <View style={styles.courseCard}>
    <View style={styles.courseIcon} />
    <Text style={styles.courseTitle}>{course.title}</Text>
  </View>
);

const AddCourse: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={{ uri: "imageUri" }}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Add Courses</Text>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
          <Text>Add Custom Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton}>
        <Link replace href="/home_Screen">Next</Link>
       
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    marginHorizontal:"auto",
    marginVertical:0,
    padding: 20,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 18,
    height: 18,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 28,
    flexDirection: "column",
  },
  heading: {
    color: "#8D99DE",
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
  },
  courseCard: {
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFF",
    display: "flex",
    marginTop: 16,
    padding: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  courseIcon: {
 borderRadius: 100,
    borderColor: "rgba(154, 165, 181, 1)",
    borderWidth: 2,
    height: 24,
    width: 24,
    marginRight: 12,
  },
  courseTitle: {
    color: "#353535",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: {
    fontWeight: "600",
    fontSize: 20,
    marginRight: 8,
    fontFamily: "Inter, sans-serif",
  },
  nextButton: {
    backgroundColor: "#8A97DD",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
  },
});

export default AddCourse;
