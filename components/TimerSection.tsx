import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

interface Props {
  clock: any;
  users: string[];
  image: any;
}

export const TimerSection: React.FC<Props> = ({ users = [], image, clock }) => {
  return (
    <View style={[styles.container]}>
      {clock && <Image source={clock} style={styles.backgroundImage} />}

      {image && (
        <View style={{
         width:"100%",
         flexDirection:"row",
         justifyContent:"flex-end",
        }}>
         <Image
          source={image}
          style={{
            height: 172,
            width: 192,
          }}
        />
         </View>
      )}

      <View style={styles.textContainer}>
          <Text style={[styles.text]}>
            Study live with {users.length} others
          </Text>
        <View style={styles.userContainer}>
          {users.map((user, index) => (
            <View key={index} style={{...styles.userAvatarContainer,left: 32+index*18}}>
              <Image source={user} style={styles.userAvatar} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical:12,
    borderRadius: 20,
    backgroundColor: "#feb5a6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 8,
    width: 375,
  },
  userContainer: {
    flexDirection: "row",
    borderRadius: 40,
    width:110,
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  userAvatarContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    position:"absolute",
  },
  userAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    flexDirection:"row",
    paddingHorizontal:16,
    paddingVertical:9,
    borderRadius:20,
    gap:7,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Inter-Bold',
    color: "#fff",
    textAlign: "left",
  },
  backgroundImage: {
    width: 129,
    height: 148,
    position: "absolute",
    left: 24,
    top: -24,
  },
});
