import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

interface Props {
  users: string[];
}

export const Users: React.FC<Props> = ({ users = []}) => {
  return (
    <View style={styles.userContainer}>
      {users.map((user, index) => (
        <View
          key={index}
          style={{ ...styles.userAvatarContainer, left: (index > 0 ?  index * 16:0) }}
        >
          <Image source={user} style={styles.userAvatar} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({

  userContainer: {
    flexDirection: "row",
    borderRadius: 40,
    height:40,
    width:72,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  userAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    position: "absolute",
  },
  userAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  }
});
