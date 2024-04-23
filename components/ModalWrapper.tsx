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

const ModalWrapper: React.FC<AddCourseModalProps> = ({
  isVisible,
  onClose,
  children,
  opPressBtn,
  data,
  Time

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
        <View style={styles.container}>
          <Image style={styles.mainbell} source={require('../assets/images/schoolbell.png')} />
          <Text style={styles.heading}>Reminder</Text>
          <Text style={[styles.heading, styles.subheading]}>Your Biology Assignment is
            Due on:</Text>
            <View style={styles.DateView}>
               <Text style={styles.DateText}>{data}</Text>
            </View>
            <View style={[styles.DateView,{marginTop:20}]}>
               <Text style={styles.DateText}>{Time}</Text>
            </View>

            <TouchableOpacity style={[styles.btn]} onPress={opPressBtn}>
               <Text style={styles.btnText}>GOT IT</Text>
            </TouchableOpacity>



        </View>

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

    paddingHorizontal: 20,
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
  mainbell: {
    width: 56,
    height: 56,
    alignSelf: 'center',
    marginTop: -20

  },
  heading: {
    color: "#353535",
    fontWeight: "700",
    lineHeight: 24.2,
    fontSize: 20,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1,
    alignSelf: 'center',
    marginTop: 14

  },
  subheading: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginTop:30,
    paddingHorizontal: 20
  },
  DateView:{
    backgroundColor:'#FFCA65',
    width:133,
    height:35,
    alignSelf:'center',
    marginTop:34,
    alignItems:'center',
    borderRadius:100,
    justifyContent:'center',
   
    
  },
  btn:{
    backgroundColor:'#8A97DD',
    width:177,
    height:40,
    alignSelf:'center',
    marginTop:50,
    marginBottom:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:100,
    
  },
  DateText:{
    color: '#E34850',
    
    fontSize: 12,
    fontWeight: '600',
  },
  btnText:{
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing:1,
    

  }
});

export default ModalWrapper;
