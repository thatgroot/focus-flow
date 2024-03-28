import { Image } from "expo-image";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
const NavItem = ({
  title,
  image,
  activeImage,
}: {
  image: any;
  activeImage: any;
  title: string;
}) => {
  const [active, setActive] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        setActive(!active);
      }}
      style={[styles.itemContainer]}
    >
      <Image
        source={active ? activeImage : image}
        style={{
          height: 24,
          width: 24,
        }}
      />
      <View style={[styles.textContainer, { justifyContent: "flex-start" }]}>
        <Text style={[styles.text, { color: active ? "#8D99DE" : "#9AA5B5" }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export const BottomNav = () => {
  return (
    <View style={[styles.container]}>
      {[
        {
          image: require("@/assets/icons/home.png"),
          activeImage: require("@/assets/icons/home-active.png"),
          title: "Home",
        },
        {
          image: require("@/assets/icons/schedule.png"),
          activeImage: require("@/assets/icons/schedule-active.png"),
          title: "Schedule",
        },
        {
          image: require("@/assets/icons/groups.png"),
          activeImage: require("@/assets/icons/groups-active.png"),
          title: "Groups",
        },
        {
          image: require("@/assets/icons/settings.png"),
          activeImage: require("@/assets/icons/settings-active.png"),
          title: "Settings",
        },
      ].map(({ image, activeImage, title }, index) => (
        <NavItem key={index} image={image} activeImage={activeImage} title={title} />
      ))}
      {/* Repeat similar structure for other items */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    height: 76,
  },
  itemContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    position: "relative",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    position: "relative",
    gap: 2.5,
  },
  text: {
    fontSize: 14,
    textAlign: "left",
  },
});
