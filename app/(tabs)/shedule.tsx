import React, { useState,useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, FlatList, Modal, Image, Pressable} from "react-native";

import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { isAfter, getDate, isSameDay } from 'date-fns';

import { Schedules } from "@/components/Schedules";
import { useRouter,useNavigation } from "expo-router";
import ShareSchedule from "@/components/ShareSchedule";



const shedule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);

  const [data] = useState([
    { time: '09:00', items: [
      { title: ['Break Fast'],time:['10 Mins'], due: [],bgColor:'rgba(255, 202, 101, 1)',icon:require('../../assets/icons/share.png')},
      { title: ['Time to Commute'],time:['10 Mins'], due: [],bgColor:'rgba(154, 165, 181, 0.25)',icon:require('../../assets/icons/share.png') }
    ] },
    { time: '10:45', items: [
      { title: ['Sociology | Lecture'],time:['2h 30 Mins'], due: [], bgColor:'rgba(254, 181, 166, 1)',icon:require('../../assets/icons/share.png') }
    ] },
    { time: '12:00', items: [
      { title: ["Planned Study", "Phsycology", "Economics"],time:['Use : 2h 30m','Use : 2h 30m','Use : 2h 30m'], due: ['Due : Nov 20','Due : Nov 20','Due : Nov 20'],bgColor:'rgba(141, 153, 222, 1)',icon:require('../../assets/icons/share.png') }
    ] },
    { time: '14:00', items: [
      { title: ['Time to Commute'],time:['10 Mins'], due: [],bgColor:'rgba(154, 165, 181, 0.25)',icon:require('../../assets/icons/share.png')}
    ] },
    
  ]);

  const router = useRouter();
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

 
  const handleDayPress = (dateString: string) => {
    setSelectedDay(new Date(dateString));
    // setSelectedDay(selectedDay);

    // setShowCalendar(false);
    // Handle scrolling by changing the current month index
    setCurrentMonthIndex(currentMonthIndex + 1);
    if (markedDates.includes(dateString)) {
      setMarkedDates(markedDates.filter((markedDate) => markedDate !== dateString));
    } else {
      setMarkedDates([...markedDates, dateString]);
    }
  };

  const renderMonthDays = (index) => {
    const today = new Date();
    const selectedDay = new Date(today.getFullYear(), today.getMonth() + index, 1); // Update selectedDay based on the index
    const year = selectedDay.getFullYear();
    const month = selectedDay.getMonth();

    // Get the last day of the current month
    const endOfMonth = new Date(year, month + 3, 0).getDate();

    // Get the last day of the next two months
    const endOfNextMonth = new Date(year, month + 2, 0).getDate();
    const endOfSecondNextMonth = new Date(year, month + 3, 0).getDate();

    const days = [];

    // Calculate the end day of rendering
    const endDay = index === 0 ? endOfMonth : index === 1 ? endOfNextMonth : endOfSecondNextMonth;

    for (let i = 1; i <= endOfMonth; i++) {
      const date = new Date(year, month + 2, i);
      const dayOfWeek = moment(date).format('ddd');
      const isCurrentOrFutureDay = isAfter(date, today);
      const isMarked = markedDates.includes(date.toISOString()); // Check if the date is marked

      days.push(
        <View style={ styles.maindayWeeks} key={i}>
          <TouchableOpacity onPress={() => setPressedIndex(i)} style={[styles.BtnDayWeeks  ,{ backgroundColor: pressedIndex === i ? '#8D99DE' : 'white'}, { borderColor: pressedIndex === i ? 'white' : 'white'},]}>
            <Text style={ [styles.dayOfWeek,{  color: pressedIndex === i ? 'white' : '#9AA5B5' }]}>{dayOfWeek}</Text>
            <Text style={[styles.day,{ color: pressedIndex === i ? 'white' : 'black' }]}>{i}</Text>

          </TouchableOpacity>
        </View>
      );
    }

    return days;
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.mainProfile}>
         
          <View>
            
            <Text style={[ styles.headingSub]}>Schedule</Text>

          </View>
          <Pressable>
          <Image source={require('../../assets/icons/share.png')} style={{width:23,height:24, tintColor:'#000'}} />

          </Pressable>
        </View>

        <View style={styles.mainCalendar}>
          <View>
            <Text style={[styles.heading, styles.headingSub]}>Today</Text>
            <Text style={styles.heading}>16 March 2024</Text>

          </View>
          <View>

            <TouchableOpacity onPress={() => setShowCalendar(true)} >
              <Image style={styles.CalendarIcon} source={require('../../assets/images/icon8.png')} />

            </TouchableOpacity>
          </View>
        </View>





        <View>
          <Modal
            visible={showCalendar}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowCalendar(false)}
          >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor: '#ffffff', width: 300, justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16, borderRadius: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, marginBottom: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>Select Date</Text>
                  <TouchableOpacity onPress={() => setShowCalendar(false)}>
                    {/* <Image source={require('../../assets/cross.png')} style={{ width: 15, height: 15 }} /> */}
                  </TouchableOpacity>
                </View>
                <Calendar
                  onDayPress={(day) => {
                    handleDayPress(day.dateString);
                    // setShowCalendar(false);
                  }}
                  markedDates={{ [moment(selectedDay).format('YYYY-MM-DD')]: { selected: true, selectedColor: '#4cb050' } }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    arrowColor: '#4cb050',
                    todayTextColor: '#4cb050',
                  }}
                />
                <TouchableOpacity onPress={() => setShowCalendar(false)} style={{ height: 40, alignSelf: 'center', marginBottom: 8, marginTop: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: '#4cb050' }}>
                  <Text style={{ color: '#ffffff' }}>Confirm Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <FlatList
            horizontal
            pagingEnabled
            data={[1]} // Provide a single item array to FlatList
            keyExtractor={() => 'month'} // Unique key for month
            showsHorizontalScrollIndicator={false}
            renderItem={({ index }) => (
              <View style={{ flexDirection: 'row', paddingHorizontal: 10, height: 120, alignItems: 'center' }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{renderMonthDays(index)}</View>
              </View>
            )}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
              setCurrentMonthIndex(newIndex);
            }}
          />
        </View>
        <View style={styles.DueDate}>
          <Text style={styles.due}>Due:</Text>
          <Text style={styles.yearDay}>Friday April 18 2023</Text>
        </View>
       {/* <View style={styles.stepperStyle}> */}
       <FlatList
       showsVerticalScrollIndicator={false}

      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20, flexDirection: 'row', width:'100%', marginTop:20, }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>{item.time}</Text>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 5,  }}>
            <View style={{ borderColor: '#8D99DE', borderWidth: 4, backgroundColor: '#FFFFFF', width: 18, height: 18, borderRadius: 100 }} />
            <View style={{ backgroundColor: '#8D99DE', width: 5, height: 170, borderRadius: 10 }} />
          </View>
          <FlatList
            data={item.items}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
            
              <Schedules item={item} open={open()} />
            )}
          />
        </View>
      )}
    />
       {/* </View> */}
    
      </View>
      <View style={styles.bottomBtn}>
        <Pressable style={styles.planBtn}>
          <Text style={styles.planTxt}>Plan</Text>
        </Pressable>
        <Pressable style={styles.completedBtn}>
          <Text style={styles.compeleteTxt}>Completed</Text>
        </Pressable>
      </View>
      
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

  mainProfile: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10

  },
  profileImage: {
    width: 53,
    height: 53,
    borderRadius: 100,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 18,
    height: 18,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 28,
    flexDirection: "column",
  },
  heading: {
    color: "#353535",
    fontWeight: "500",
    lineHeight: 19.36,
    fontSize: 15,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1,
    
  },

  headingSub: {
    color: "#8D99DE",
    fontSize: 16,
    lineHeight: 19.36,
    letterSpacing: 1,
    fontWeight:'700',

  },
  mainCalendar:{
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:30
  },
  CalendarIcon: {
    height: 38,
    width: 38
  },
 
  bgImage:{
  width:215,
  height:169
  },
  courseCard: {
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFF",
    display: "flex",
    marginTop: 16,
    padding: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  maindayWeeks:{
   flexDirection:'row' ,
   alignItems:'center',
  marginTop:20
  },

  dayOfWeek:{
    color: "#353535",
    fontWeight: "500",
    lineHeight: 19.36,
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1, 
  },
  day:{
    color: "#353535",
    fontWeight: "400",
    lineHeight: 19.36,
    fontSize: 19,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1,
    marginTop:10
  },
  BtnDayWeeks:{
       borderColor:'##8D99DE',
       borderWidth:1,
      marginLeft:10,
     justifyContent:'center', 
     alignItems: 'center', 
     borderRadius: 7,
     width: 50,
      height: 80
  },
  courseIcon: {
    borderRadius: 100,
    borderColor: "rgba(154, 165, 181, 1)",
    borderWidth: 2,
    height: 24,
    width: 24,
    marginRight: 12,
  },
 


  addButtonText: {
    fontWeight: "600",
    fontSize: 20,
    marginRight: 8,
    fontFamily: "Inter, sans-serif",
  },
  DueDate:{
    flexDirection:'row',
    marginTop:20
  } ,
  due:{
    color:'#9AA5B5',
    lineHeight:15.73,
    fontWeight:'500',
    fontSize:13,

  },
  yearDay:{
    fontWeight:'400',
    fontSize:13,
    lineHeight:15.73,
    color:'#353535',
    marginLeft:4
  },
  stepperStyle:{
    marginTop:20
  },
  bottomBtn:{
    flexDirection:'row',
    position:'absolute',
    bottom:0.1,
    width:'100%',
    // left:20,
    justifyContent:'center',
    backgroundColor:'#FFFFFF',
    height:80,
    alignItems:'center'
  },
  planBtn:{
    width:139,
    height:40,
    borderRadius:100,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'rgba(141, 153, 222, 1)'
  },
  completedBtn:{
    width:193,
    height:40,
    borderRadius:100,
    backgroundColor:'rgba(138, 151, 221, 1)',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5
  },
  planTxt:{
    fontSize:16,
    fontWeight:'600',
    lineHeight:19.36,
    color:'rgba(141, 153, 222, 1)'
  },
  compeleteTxt:{
    fontSize:16,
    fontWeight:'600',
    lineHeight:19.36,
    color:'rgba(255, 255, 255, 1)'
  }

});

export default shedule;
