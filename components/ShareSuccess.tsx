import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

interface TextProps {
  content: string;
  style: object;
}

const CustomText: React.FC<TextProps> = ({ content, style }) => (
  <Text style={style}>{content}</Text>
);

interface ScreenSectionProps {
  textContents: { content: string; style: object }[];
}

const ScreenSection: React.FC<ScreenSectionProps> = ({ textContents }) => (
  <>
    {textContents.map((textItem, index) => (
      <CustomText key={index} content={textItem.content} style={textItem.style} />
    ))}
  </>
);

const ShareSuccess: React.FC = () => {
  const congratulationTexts = [
    { content: "Congratulations!", style: styles.headingText },
    { content: "Class Scheduled!", style: styles.headingText },
    { content: "Share your Schedule", style: styles.subHeadingText },
    { content: "You can always share your schedule!", style: styles.infoText },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScreenSection textContents={congratulationTexts} />
        <Image resizeMode="contain" source={{ uri: "your_image_uri_here" }} style={styles.mainImage} />
        <TouchableOpacity style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notNowButton}>
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFF",
    display: "flex",
    maxWidth: 430,
    fontSize: 16,
    padding: 66,
  },
  card: {
    alignItems: "center",
    display: "flex",
    width: 244,
    maxWidth: "100%",
    flexDirection: "column",
  },
  headingText: {
    color: "#353535",
    textAlign: "center",
    fontFamily: "Inter",
    marginTop: 27,
    fontWeight: "bold",
  },
  subHeadingText: {
    color: "#8D99DE",
    textAlign: "center",
    fontFamily: "Inter",
    marginTop: 27,
    fontWeight: "600",
  },
  infoText: {
    color: "#000",
    alignSelf: "stretch",
    marginTop: 27,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
  },
  mainImage: {
    marginTop: 27,
    width: 94,
    height: 94,
  },
  shareButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#8D99DE",
    display: "flex",
    marginTop: 27,
    width: 193,
    padding: 10,
  },
  shareButtonText: {
    color: "#8D99DE",
    fontFamily: "Inter",
    fontWeight: "600",
  },
  notNowButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#8A97DD",
    marginTop: 27,
    width: 193,
    padding: 10,
  },
  notNowButtonText: {
    color: "#FFF",
    fontFamily: "Inter",
    fontWeight: "600",
  },
});

export default ShareSuccess;
