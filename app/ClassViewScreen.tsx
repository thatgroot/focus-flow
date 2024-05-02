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
import { SubjectCard } from "@/components/SubjectCard";
const data=[
    {
      title: "Sociology",
    
    },
    {
        title: "Biology",
       
      },
      {
        title: "Physics",
        
      
      },
      
    
    
   
  ]

const ClassViewScreen: React.FC = () => {

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
          {data.map((subject, index) => (
            <SubjectCard
              key={index}
              title={subject.title}
              items={[
                { text: "Assignment", bg: "#FEB5A625" },
                {
                  text: "Quiz",
                  bg: "#8D99DE30",
                },
                {
                  text: "Session",
                  bg: "#FFCA6535",
                },
                {
                  text: "Exam",
                  bg: "#13CE6630",
                },
              ]}
              dueDate="27-Dec-2024"
              dueTime="09:00 PM"
              bgColor="#8d99de"
              borderColor="#000"
            />
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

export default ClassViewScreen;
