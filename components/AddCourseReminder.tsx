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
import Reminder from "./Reminder";


interface AddCourseReminder {
  isVisible: boolean;
  onClose: () => void;
}
type InfoProps = {
  label: string;
  value: string;
};

const Info: React.FC<InfoProps> = ({ label, value }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoText}>{label}: {value}</Text>
  </View>
);

const AddCourseReminder: React.FC<AddCourseModalProps> = ({
  isVisible,
  onClose,
}) => {
  const infoData = [
    { label: "Date", value: "Dec-27-2024" },
    { label: "Time", value: "09:00PM" },
  ];

  return (
    <ModalWrapper isVisible={isVisible} onClose={onClose}>
       <View style={styles.container}>
       <Image style={styles.mainbell} source={require('../assets/images/schoolbell.png')} />
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Reminder</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.descriptionText}>
          Your Biology Assignment is due on:
        </Text>
      </View>
      {infoData.map((item, index) => (
        <Info key={index} label={item.label} value={item.value} />
      ))}
      <TouchableOpacity style={styles.button} onPress={onClose}>
        <Text style={styles.buttonText}>GOT IT</Text>
      </TouchableOpacity>
    </View>
    
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    alignItems: "center",
    
    paddingHorizontal: 24,
  },
  mainbell: {
    width: 56,
    height: 56,
    alignSelf: 'center',
    marginTop: -40

  },
  image: {
    width: 56,
    height: 56, // Aspect ratio of 1.33 assumed from the `aspectRatio` property
  },
  subContainer: {
    marginTop: 18,
  },
  titleText: {
    color: "#27272A",
    fontWeight: "bold",
    fontSize: 20,
  },
  descriptionText: {
    color: "#000",
    textAlign: "center",
    marginTop: 27,
    fontSize: 16,
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    width:"100%",
    borderRadius: 100,
    backgroundColor: "rgba(255, 202, 101, 0.36)",
    marginTop: 18,
    padding: 10,
  },
  infoText: {
    color: "#E34850",
    fontWeight: "600",
    textAlign: "center",
    width:"auto",
  },
  button: {
    marginTop: 58,
    backgroundColor: "blue",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default AddCourseReminder;
