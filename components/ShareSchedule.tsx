import React from "react";
import { View, StyleSheet, Image, Text, ScrollView } from "react-native";

interface ImageWithCaptionProps {
  uri: string;
  caption: string;
}

const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({ uri, caption }) => (
  <View style={styles.imageCaptionContainer}>
    <Image resizeMode="contain" source={{ uri }} style={styles.iconImage} />
    <Text>{caption}</Text>
  </View>
);

const ShareSchedule: React.FC = () => {
  const iconsData = [
    { uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/327017f67b9e886219b1453474d2ef82cd795bd14deafb716f68ea0183aef5c2?apiKey=01949c46d9eb45b0b69b6656894854ec&", caption: "Share your Schedule" },
    { uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f8f159c0ad4dada5331d9ef62216089ebb8a7e62863dd60f4c92907b16715f3?apiKey=01949c46d9eb45b0b69b6656894854ec&", caption: "Date" },
    { uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f41312900bb2a96e33427525ddec826eb0211cd7e982fce021617d61554df06?apiKey=01949c46d9eb45b0b69b6656894854ec&", caption: "From" },
    { uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f41312900bb2a96e33427525ddec826eb0211cd7e982fce021617d61554df06?apiKey=01949c46d9eb45b0b69b6656894854ec&", caption: "To" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageWithCaption uri={iconsData[0].uri} caption={iconsData[0].caption} />
        <Text style={styles.headerDescription}>
          Choose Your Timeline that you want to share
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTitle}>Choose date</Text>
        <View style={styles.dateSelection}>
          <Text>Date</Text>
          <Image resizeMode="contain" source={{ uri: iconsData[1].uri }} style={styles.iconImage} />
        </View>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeTitle}>Choose Time</Text>
        <View style={styles.timeSelectionRow}>
          <ImageWithCaption uri={iconsData[2].uri} caption={iconsData[2].caption} />
          <ImageWithCaption uri={iconsData[3].uri} caption={iconsData[3].caption} />
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Text style={styles.dividerText}>OR</Text>
        <Text style={styles.fullScheduleText}>Share Whole schedule ?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  imageCaptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  headerDescription: {
    textAlign: "center",
    color: "#000",
    marginTop: 10,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
  dateContainer: {
    marginTop: 15,
  },
  dateTitle: {
    fontSize: 16,
    color: "#353535",
    fontFamily: "Inter-Bold",
  },
  dateSelection: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderColor: "#9AA5B5",
    borderRadius: 100,
    marginTop: 10,
  },
  timeContainer: {
    marginTop: 36,
  },
  timeTitle: {
    fontSize: 16,
    color: "#353535",
    fontFamily: "Inter-Bold",
  },
  timeSelectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  dividerContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  dividerText: {
    fontFamily: "Inter-Regular",
    backgroundColor: "#8A97DD",
    color: "transparent",
    alignSelf: "center",
  },
  fullScheduleText: {
    color: "#353535",
    fontFamily: "Inter-Regular",
    marginTop: 10,
  },
});

export default ShareSchedule;
