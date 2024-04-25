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

const EditProfile: React.FC = () => {

    const router = useRouter();
    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.mainView}>
                    <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.LeftIcon} source={require('../assets/images/iconleft.png')} />
                    </TouchableOpacity>
                 

                        <Text style={styles.heading}>Settings</Text>
                    
                    <View />
                </View>
                <Text style={[styles.heading,styles.ManageAccout]}>Manage Account</Text>
                <View style={{paddingVertical:30}}>
                <Text style={styles.StylesTitle}>Change Email Address</Text>
                    <View style={styles.mainSearch}>

                        <TextInput placeholder="teebaapp123@gmail.com" style={styles.TextInput} placeholderTextColor={'#9AA5B5'} />
                        <TouchableOpacity>
                        <Image style={styles.ProfileEdit} source={require('../assets/images/Icon.png')} />
                        </TouchableOpacity>
                    </View>
                    </View>
                    <View>
                <Text style={styles.StylesTitle}>Change Password</Text>
                    <View style={styles.mainSearch}>

                        <TextInput placeholder="Password" style={styles.TextInput} placeholderTextColor={'#9AA5B5'} />
                        <TouchableOpacity>
                        <Image style={styles.ProfileEdit} source={require('../assets/images/Icon.png')} />
                        </TouchableOpacity>
                    </View>
                    </View>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={[styles.heading,styles.BtnText]}>Save Changes</Text>
                    </TouchableOpacity>
               
                
               




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
        color: "rgba(53, 53, 53, 1)",
        fontWeight: "700",
        lineHeight: 24.2,
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        letterSpacing: 1,
    },
    BtnText:{
   color:'rgba(255, 255, 255, 1)'
    },
    ManageAccout:{
        fontSize: 16,
        fontWeight: "600",
        marginTop:37
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
    StylesTitle: {
        color: "rgba(53, 53, 53, 1)",
        fontWeight: "500",
        lineHeight: 19.36,
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        letterSpacing: 1,
        marginLeft: 10

    },
    ProfileEdit: {
        width: 14,
        height: 14
      },
    mainSearch: {
        borderWidth: 2,
        borderColor: 'rgba(154, 165, 181, 1)',
        width: "100%",
        height: 60,
        borderRadius: 100,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop:16
        
    },
   
    TextInput: {
        flex: 1,
        color: '#9AA5B5',
        fontSize: 16,
        fontWeight: '300'
    },
  
    btn:{
        width:196,
        height:50,
        backgroundColor:'rgba(139, 152, 221, 0.77)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100,
        marginTop:90,
        alignSelf:'center'
    
    },
 



});

export default EditProfile;
