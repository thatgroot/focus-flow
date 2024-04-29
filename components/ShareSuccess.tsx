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

const ShareSuccess: React.FC = ({onclose,share}) => {
  const congratulationTexts = [
  
    { content: "Class Scheduled!", style: styles.headingText },
    { content: "Share your Schedule", style: styles.subHeadingText },
    { content: "You can always share your schedule!", style: styles.infoText },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headingText}>Congratulations!</Text>
      <Image resizeMode="contain" source={require('../assets/icons/approve.png')} style={styles.mainImage} />
         
        <ScreenSection textContents={congratulationTexts} />

        <TouchableOpacity onPress={() => {
          onclose()
          share()
        } } style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onclose() } style={styles.notNowButton}>
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
    fontFamily: "Inter-Regular",
    marginTop: 27,
    fontFamily: 'Inter-Bold',
  },
  subHeadingText: {
    color: "#8D99DE",
    textAlign: "center",
    fontFamily: "Inter-Regular",
    marginTop: 27,
    fontWeight: "600",
  },
  infoText: {
    color: "#000",
    alignSelf: "stretch",
    marginTop: 27,
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
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
    fontFamily: "Inter-Regular",
    fontWeight: "600",
  },
});

export default ShareSuccess;
