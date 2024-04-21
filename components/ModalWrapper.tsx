import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import LabeledInput from "./InputField";

interface AddCourseModalProps {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
} // Optional children prop using React.ReactNode type

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const [courseName, setCourseName] = useState<string>("");

  const handleAddPress = () => {
    Alert.alert("Course Added", `The course "${courseName}" has been added.`);
    setCourseName("");
    onClose(); // Call the onClose callback after adding the course
  };

  return (
    <Modal visible={isVisible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalView}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
  },
});

export default AddCourseModal;
