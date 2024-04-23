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
import { calculateAngle, calculatePosition } from "@/utils";


import { Link, useNavigation, useRouter } from "expo-router";
import { Users } from "@/components/Users";
import { CircularImageWithOverlays } from "@/components/CircularImageWithOverlays";

const ParticipantsPage: React.FC = () => {

    const router = useRouter();
    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.LeftIcon} source={require('../assets/images/iconleft.png')} />
                    </TouchableOpacity>
                    <View style={styles.mainStudy}>

                        <Image style={styles.LeftIcon} source={require('../assets/images/team.png')} />
                        <Text style={styles.heading}>Study Together</Text>
                    </View>
                    <View />
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

    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
  
    mainStudy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    heading: {
        color: "#8D99DE",
        fontWeight: "700",
        lineHeight: 24.2,
        fontSize: 20,
        fontFamily: "Inter, sans-serif",
        letterSpacing: 1,
    },
 
   
    
    
  
  
   
   
  
    
   



});

export default ParticipantsPage;
