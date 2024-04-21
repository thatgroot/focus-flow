import AddCourseModal from "@/components/AddCourseModal";
import ButtonLink from "@/components/ButtonLink";
import Checkbox from "@/components/CheckBox";
import CheckboxGroup from "@/components/CheckBoxGroup";
import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import { theme } from "@/styles/theme";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// export const Modal = () => {
//   return (
//     <View
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "flex-start",
//         alignItems: "center",
//         position: "relative",
//         gap: 56,
//         paddingLeft: 26,
//         paddingRight: 26,
//         paddingTop: 22,
//         paddingBottom: 22,
//         borderRadius: 10,
//         backgroundColor: "#fff",
//         shadowColor: "rgba(0,0,0,0.04)",
//         // shadow
//         // 0px 2px 48px 0
//       }}
//     >
//       <View
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "flex-end",
//           alignSelf: "stretch",
//           flexGrow: 0,
//           flexShrink: 0,
//           position: "relative",
//         }}
//       >
//         <Image
//           source={require("@/assets/icons/close.png")}
//           style={{ width: 22, height: 22 }}
//         />
//       </View>
//       <Text
//         style={{
//           fontSize: 20,
//           fontWeight: "700",
//           textAlign: "center",
//           color: "#8d99de",
//         }}
//       >
//         Add Custom Course
//       </Text>
//       <LabeledInput
//         label=""
//         placeholder="Enter Course Name"
//         inputType="text"
//         error="Email taken. Try another one"
//       />
//       <View
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: 40,
//           position: "relative",
//           gap: 10,
//         }}
//       >
//         <Text
//           style={{
//             fontSize: 16,
//             fontWeight: "600",
//             textAlign: "center",
//             color: "#fff",
//           }}
//         >
//           Add
//         </Text>
//       </View>
//     </View>
//   );
// };
export default function AddCourse() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log("Selected label:", JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };
  return (
    <ScrollView
      style={{ ...styles.container, paddingTop: insets.top, paddingLeft: 20 }}
    >
      <Image
        source={require("@/assets/icons/back.png")}
        style={{ height: 18, width: 18 }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 34,
          paddingTop: 28,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            color: "#8d99de",
          }}
        >
          Add Courses
        </Text>
        <CheckboxGroup onChange={handleCheckboxChange}>
          {["Pscychology", "Biology", "Physics", "Mathematics"].map(
            (label, index) => (
              <Checkbox
                isRadio={true}
                isChecked={false}
                onPress={() => {}}
                key={index}
                label={label}
              />
            )
          )}
        </CheckboxGroup>
        <ButtonLink />
        <Button text="Next" />
      </View>

      <AddCourseModal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(!modalVisible);
        }}
      />

      <AddCourseModal isVisible={modalVisible} onClose={()=>{}}/>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.background },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
