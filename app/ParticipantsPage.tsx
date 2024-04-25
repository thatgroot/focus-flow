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
import SegmentedControlTab from 'react-native-segmented-control-tab';
const dataGoal = [
    {
        id: 1,
        time: '60h',
        Weekly: 'Weekly goal',
        color: 'rgba(254, 181, 166, 1)',
    },
    {
        id: 2,
        time: '60h',
        Weekly: 'Daily goal',
        color: 'rgba(255, 202, 101, 1)',
    },
    {
        id: 3,
        time: '60h',
        Weekly: 'Participants',
        color: 'rgba(139, 152, 221, 0.77)',

    }
];

const WeekData = [
    { id: 1, name: 'Anwer joye', Time: "50h 30m" },
    { id: 2, name: 'Anwer joye', Time: "50h 30m" },
    { id: 3, name: 'Anwer joye', Time: "50h 30m" },
    { id: 4, name: 'Anwer joye', Time: "50h 30m" },
    { id: 5, name: 'Anwer joye', Time: "50h 30m" },


];


const ParticipantsPage: React.FC = () => {

    const router = useRouter();
    const navigation = useNavigation();
    const [customSelectedIndex, setCustomSelectedIndex] = React.useState(0);
    const updateCustomSegment = (index: number) => {
        setCustomSelectedIndex(index);
    };



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

                <View style={styles.boxView}>
                    {dataGoal.map((item) => (
                        <View style={[styles.boxViewDay, { backgroundColor: item.color }]} key={item.id}>
                            <View>
                                <Text style={styles.headingsub}>{item.time}</Text>
                                <Text style={styles.headingWeeks}> {item.Weekly}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                <SegmentedControlTab
                    borderRadius={90}
                    values={['This week', 'This month', 'All Time']}
                    selectedIndex={customSelectedIndex}
                    onTabPress={updateCustomSegment}
                    tabsContainerStyle={{
                        height: 53,
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: 100,
                        marginTop: 40

                    }}
                    tabStyle={{

                        borderWidth: 0,
                        borderColor: 'transparent',
                        width: '100%',
                        marginHorizontal: 6,
                        borderRadius: 20,
                        height: 35,
                        paddingLeft: 19,
                        paddingRight: 19,
                        backgroundColor: 'rgba(250, 250, 250, 1)'

                    }}

                    activeTabStyle={{
                        backgroundColor: 'rgba(141, 153, 222, 1)', paddingLeft: 19, paddingRight: 19, height: 45,
                        borderRadius: 90,
                    }}
                    tabTextStyle={{ color: 'rgba(154, 165, 181, 1)', fontSize: (14), fontWeight: '500', }}
                    activeTabTextStyle={{ color: 'white', fontSize: (14), fontWeight: '500', }}
                />
                {customSelectedIndex === 0 && (


                    <View style={{marginTop:30}}>
                        {WeekData.map((item, index) =>
                            <View style={styles.mainWeeks}>
                                <View style={styles.boxId}>
                                <Text style={styles.idView}>{item.id}</Text>
                                </View>
                                <View>
                                <Text style={styles.stylesName}>{item.name}</Text>
                                <Text style={styles.stylesTime}>{item.Time}</Text>
                                </View>
                            </View>



                        )}
                    </View>






                )}

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
    boxView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 45
    },
    boxViewDay: {
        backgroundColor: 'rgba(254, 181, 166, 1)',
        height: 96,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    headingsub: {
        color: "rgba(255, 255, 255, 1)",
        fontWeight: "600",
        lineHeight: 26.63,
        fontSize: 22,
        fontFamily: "Inter, sans-serif",
        textAlign: 'center'
    },
    headingWeeks: {

        color: "rgba(255, 255, 255, 1)",
        fontWeight: "400",
        lineHeight: 26,
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        textAlign: 'center'
    },
    mainWeeks: {
        borderWidth: 1,
        borderColor: 'rgba(255, 202, 101, 1)',
        width: '100%',
        height: 83,
        paddingHorizontal: 13,
        marginVertical: 12,
        borderRadius: 7,
        // justifyContent: 'center',
    
        flexDirection:'row',
        alignItems:'center',
        gap:10


    },
    boxId:{
        width:40,
        height:40,
        backgroundColor:'rgba(154, 165, 181, 0.08)',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    },
    idView:{
        color: "rgba(154, 165, 181, 1)",
        fontWeight: "500",
        lineHeight: 26,
        fontSize: 20,

    },
    stylesName:{
        color: "rgba(92, 92, 92, 1)",
        fontWeight: "500",
        lineHeight: 18.15,
        fontSize: 15,
        fontFamily: "Inter, sans-serif",
    
    },
    stylesTime:{
        color: "rgba(255, 202, 101, 1)",
        fontWeight: "500",
        lineHeight: 19.15,
        fontSize: 16,
        fontFamily: "Inter, sans-serif",
        marginTop:4
    }













});

export default ParticipantsPage;
