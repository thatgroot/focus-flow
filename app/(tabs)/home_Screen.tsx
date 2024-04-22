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
} from "react-native";

import { Calendar } from "react-native-calendars";
import moment from "moment";
import DayCard from "@/components/DayCard";

const HomeScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  const [activeDay, setActiveDay] = useState<number | null>(null);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);

  const handleDayPress = (dateString: string) => {
    const _date = new Date(dateString);
    setSelectedDay(_date);
    // setSelectedDay(selectedDay);
    // setShowCalendar(false);
    // Handle scrolling by changing the current month index
    setCurrentMonthIndex(currentMonthIndex + 1);
    if (markedDates.includes(_date)) {
      setMarkedDates(markedDates.filter((markedDate) => markedDate !== _date));
    } else {
      setMarkedDates([...markedDates, _date]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.mainProfile}>
          <View>
            <Image
              style={styles.profileImage}
              source={require("../../assets/images/Image.png")}
            />
          </View>
          <View>
            <Text style={styles.heading}>Hi, Ingredia</Text>
            <Text style={[styles.heading, styles.headingSub]}>
              Good Morning!
            </Text>
          </View>
        </View>

        <View style={styles.mainCalendar}>
          <View>
            <Text style={[styles.heading, styles.headingSub]}>Today</Text>
            <Text style={styles.heading}>16 March 2024</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Image
                style={styles.CalendarIcon}
                source={require("../../assets/images/icon8.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainImage}>
          <Image
            resizeMode="cover"
            style={styles.bgImage}
            source={require("../../assets/images/bg.png")}
          />
        </View>

        <View>
          <Modal
            visible={showCalendar}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowCalendar(false)}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  width: 300,
                  justifyContent: "space-between",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderRadius: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Select Date</Text>
                  <TouchableOpacity onPress={() => setShowCalendar(false)}>
                    {/* <Image source={require('../../assets/cross.png')} style={{ width: 15, height: 15 }} /> */}
                  </TouchableOpacity>
                </View>
                <Calendar
                  onDayPress={(day) => {
                    handleDayPress(day.dateString);
                    // setShowCalendar(false);
                  }}
                  markedDates={{
                    [moment(selectedDay).format("YYYY-MM-DD")]: {
                      selected: true,
                      selectedColor: "#4cb050",
                    },
                  }}
                  theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    arrowColor: "#4cb050",
                    todayTextColor: "#4cb050",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowCalendar(false)}
                  style={{
                    height: 40,
                    alignSelf: "center",
                    marginBottom: 8,
                    marginTop: 8,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 150,
                    backgroundColor: "#4cb050",
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>Confirm Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <FlatList
            horizontal
            pagingEnabled
            data={[
              {
                day: "Sun",
                date: "15",
              },
              {
                day: "Mon",
                date: "16",
              },
              {
                day: "Tue",
                date: "16",
              },
            ]} // Provide a single item array to FlatList
            keyExtractor={() => "month"} // Unique key for month
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <DayCard
                filled={activeDay === index}
                active={activeDay === index}
                dayOfWeek={item.day}
                date={item.date}
                onSelect={() => {
                  setActiveDay(index);
                }}
              />
            )}

            onMomentumScrollEnd={(event) => {
              const newIndex = Math.round(
                event.nativeEvent.contentOffset.x /
                  event.nativeEvent.layoutMeasurement.width
              );
              setCurrentMonthIndex(newIndex);
            }}
          />
        </View>
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
    flexDirection: "row",
    gap: 10,
  },
  dayCard: {},
  dayText: {
    fontSize: 12,
    paddingLeft: 2,
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
    color: "#9AA5B5",
    fontSize: 14,
    lineHeight: 19.36,
    letterSpacing: 1,
  },
  mainCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  CalendarIcon: {
    height: 38,
    width: 38,
  },
  mainImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  bgImage: {
    width: 215,
    height: 169,
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
  maindayWeeks: {
    flexDirection: "row",
    alignItems: "center",
  },
  BtnDayWeeks: {
    borderColor: "##8D99DE",
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    width: 50,
    height: 80,
  },
  courseIcon: {
    borderRadius: 100,
    borderColor: "rgba(154, 165, 181, 1)",
    borderWidth: 2,
    height: 24,
    width: 24,
    marginRight: 12,
  },
  // courseTitle: {
  //   color: "#353535",
  //   textAlign: "center",
  //   fontWeight: "500",
  //   fontSize: 16,
  //   fontFamily: "Inter, sans-serif",
  // },

  addButtonText: {
    fontWeight: "600",
    fontSize: 20,
    marginRight: 8,
    fontFamily: "Inter, sans-serif",
  },
});

export default HomeScreen;
