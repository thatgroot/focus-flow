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
import SelectDropdown from "react-native-select-dropdown";
const TimeList = [
    {
      id: 1,
      TimeName:'20 minutes'
    },
    {
      id: 2,
      TimeName:'30 minutes'
    },
    {
      id: 3,
      TimeName:'40 minutes'
    },
  
  ];

import { Link, useNavigation, useRouter } from "expo-router";




const GroupDetails: React.FC = () => {
    const [selectedTimeName, setSelectedTimeName] = useState('');

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


                <View style={{ marginTop: 55 }}>
                    <Text style={styles.StylesTitle}>Group Title</Text>
                    <View style={styles.mainSearch}>

                        <TextInput placeholder="Group Title" style={styles.TextInput} placeholderTextColor={'#9AA5B5'} />

                    </View>
                    <Text style={styles.TimeStyles}>1/17</Text>
                    <Text style={[styles.StylesTitle, styles.BioStyles]}>Group Bio</Text>
                    <View style={styles.mainSearchBio}>

                        <TextInput placeholder="Group Bio..." style={styles.TextInputBio} placeholderTextColor={'#9AA5B5'} />
                    </View>
                    <Text style={styles.TimeStyles}>1/17</Text>
                    <View style={{margin:20}}/>
                    <Text style={[styles.StylesTitle, styles.BioStyles]}>Add Time</Text>
                    <View style={{margin:10}}/>
                   
                    <SelectDropdown
                      data={TimeList}
                      onSelect={(selectedItem, index) => {
                        console.warn(selectedItem);
                      }}
                 
                      defaultButtonText={  selectedTimeName || '20 minutes' }
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // Return the specific property you want to display after selection
                        setSelectedTimeName(selectedItem.TimeName)
                        return selectedItem.TimeName;
                      }}
                     
                      rowTextForSelection={(item, index) => {
                        // Return the specific property you want to display for each item
                        return item.TimeName;
                      }}
                     
                     buttonStyle={styles.dropDownlist}
                    />


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
    StylesTitle: {
        color: "rgba(53, 53, 53, 1)",
        fontWeight: "500",
        lineHeight: 19.36,
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        letterSpacing: 1,
        marginLeft: 10

    },
    BioStyles: {
        marginTop: 30
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
        marginTop: 17
    },
    mainSearchBio:{
        borderWidth: 2,
        borderColor: 'rgba(154, 165, 181, 1)',
        width: "100%",
        height: 124,
        borderRadius: 5,
        paddingHorizontal:20,
        paddingTop:20
       
        
      
    },
    TextInput: {
        flex: 1,
        color: '#9AA5B5',
        fontSize: 16,
        fontWeight: '300'
    },
    TextInputBio:{
        color: '#9AA5B5',
        fontSize: 16,
        fontWeight: '300'
    },
    TimeStyles:{
        alignSelf:'flex-end',
        marginRight:20,
        marginTop:2,
        color: "rgba(154, 165, 181, 1)",
        fontWeight: "500",
        lineHeight: 19.36,
        fontSize: 14,
    },
    dropDownlist:{
        borderWidth: 2,
        borderColor: 'rgba(154, 165, 181, 1)=',
        width: "100%",
        height: 60,
        backgroundColor:"#FAFAFA",
        borderRadius:100

    }



});

export default GroupDetails;
