import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    Modal,
    ScrollView,
    TextInput

} from "react-native";


import { Link, useNavigation, useRouter } from "expo-router";
import { Users } from "@/components/Users";
import { CompletedTask } from "@/components/CompletedTask";
const data=[
    {
      title: "Sociology",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
      completedDate: "Completed : Aug 19",
      spentTime: "Spent : 2h 25m",
    },
    {
      title: "History",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
      completedDate: "Completed : Aug 20",
      spentTime: "Spent : 1h 45m",
    },
    {
      title: "Mathematics",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
      completedDate: "Completed : Aug 21",
      spentTime: "Spent : 3h 10m",
    },
    {
      title: "Literature",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
      completedDate: "Completed : Aug 22",
      spentTime: "Spent : 2h 55m",
    },
    {
      title: "Physics",
      description:
        "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
      completedDate: "Completed : Aug 23",
      spentTime: "Spent : 4h 20m",
    },
  ]

const CompletedTaskScreen: React.FC = () => {

    const router = useRouter();
    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container} >
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.LeftIcon} source={require('../assets/images/iconleft.png')} />
                    </TouchableOpacity>


                        <Text style={styles.heading}>Completed Tasks</Text>
                     

                    <View />
                </View>
                <View
          style={{
            gap: 30,
            alignItems: "center",
            marginTop:30
          }}
        >
          {data.map((data, index) => (
            <CompletedTask key={index} {...data} />
          ))}
        </View>
                
               







            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FAFAFA",
        width: "100%",
        height: "100%",
        paddingHorizontal: 22,
        paddingVertical: 22,
    },
    LeftIcon: {
        width: 18,
        height: 18
    },
    heading: {
        color: "rgba(141, 153, 222, 1)",
        fontFamily: "Inter-Bold",
        lineHeight: 24,
        fontSize: 16,
        letterSpacing: 1,
    },
    BtnText:{
   color:'rgba(255, 255, 255, 1)'
    },
   
    mainStudy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },



  




});

export default CompletedTaskScreen;
