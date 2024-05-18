import {
 SafeAreaView,
 StyleSheet,
 Text,
 View,
 Image,
 TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { SubjectPicker } from "@/components/schedules/SubjectPicker";


export const ClassPicker = () => {

 const [data, setData] = useState<Schedule>({
  startDate: new Date(),
  endDate: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  note: "",
  schedule: "daily",
  subject: "",
  completionStatus: false,
  tags: [],
 });

 const handleCheckboxChange = ({
  current,
 }: {
  current: string;
  selected: string[];
 }) => {
  setData({
   ...data,
   subject: current,
  });
 };




 return (
  <SafeAreaView style={{ flex: 1 }}>
   <View style={styles.header}>
   <TouchableOpacity
              style={{
                height: 32,
                width: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => router.back()}
            >
              <Image
                source={require("@/assets/icons/back.png")}
                style={styles.backBtn}
              />
            </TouchableOpacity>
    <Text style={styles.headerTxt}>Add to Planner</Text>
   </View>
   <SubjectPicker onChange={handleCheckboxChange} onAction={() => {
    router.push("/addToPlanner");
   }} />

  </SafeAreaView>
 );
};


const styles = StyleSheet.create({
 header: {
  flexDirection: "row",
  gap: 50,
  marginTop: 40,
  // justifyContent:'center',
  alignItems: "center",
  marginLeft: 20,
 },
 headerTxt: {
  fontWeight: "700",
  fontSize: 20,
  lineHeight: 24,
  fontFamily: "Inter-Bold",
  color: "#8D99DE",
 },
 backBtn: {
  width: 20,
  height: 20,
 },


 modalView: {
  paddingHorizontal: 34,
  paddingVertical: 34,
  marginTop: 5,
  width: "100%",
 },
 dropDownlist: {
  borderWidth: 1,
  borderColor: "rgba(154, 165, 181, 1)",
  width: 308,
  height: 50,
  backgroundColor: "#FAFAFA",
  borderRadius: 100,
  marginTop: 20,
 },
 header2: {
  flexDirection: "row",
  gap: 50,
  marginTop: 40,
  // justifyContent:'center',
  alignItems: "center",
 },
 dropDownlistContainer: {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
 },
 textArea: {
  fontSize: 15,
  lineHeight: 20,
  fontFamily: "Inter-Regular",
  borderWidth: 1,
  borderColor: "#9AA5B5",
  width: 308,
  height: 127,
  borderRadius: 10,
  paddingLeft: 10,
  marginTop: 20,
  fontWeight: "500",
 },

 containerDate: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
 },
 modalBtn: {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
 },
});
