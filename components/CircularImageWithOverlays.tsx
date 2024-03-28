import { Image } from "expo-image";
import React from "react";
import { View, StyleSheet } from "react-native";

export const CircularImageWithOverlays: React.FC<CircularImageOverlayProps> = ({
  mainImage,
  orbitImages,
}) => {
  const renderSmallImage = ({
    source,
    position,
  }: {
    source: string;
    position: {
      left: number;
      top: number;
    };
  }) => {
    return (
      <Image
        key={source || Math.random()} // Use a unique key
        source={source}
        style={[
          styles.smallImage,
          {
            width: 22,
            height: 22,
            position: "absolute",
            left: position.left,
            top: position.top,
          },
        ]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 285, height: 285 }}>
        <Image source={mainImage} style={styles.circularImage} />
      </View>
      {orbitImages.map(renderSmallImage)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  circularImage: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  smallImage: {
    resizeMode: "cover",
  },
});
