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
import ModalWrapper from "./ModalWrapper";

interface AddCourseModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isVisible,
  onClose,
}) => {

  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
      <View style={styles.header}>
        <Image
          resizeMode="cover"
          source={{ uri: "image-url" }} // Replace 'image-url' with your image url
          style={styles.headerImage}
        />
      </View>
      <Text style={styles.title}>Add Custom Course</Text>
      <LabeledInput
        placeholder="Enter Course Name"
        inputType="text"
        label=""
        error="please provide course name"
      />
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </ModalWrapper>
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
  header: {
    alignItems: "center",
  },
  headerImage: {
    width: 100,
  },
  title: {
    color: "#8D99DE",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 20,
  },
  inputContainer: {
    borderColor: "#9AA5B5",
    borderWidth: 2,
    borderRadius: 5,
    marginVertical: 20,
    width: "100%",
  },
  input: {
    fontSize: 14,
    color: "#898989",
    padding: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "#8A97DD",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 100,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    marginVertical: 20,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#CCCCCC",
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 100,
    marginVertical: 10,
  },
});

export default AddCourseModal;
