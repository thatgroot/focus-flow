import { useAppStore } from "@/store";
import { arabic_dates, getFlexDirection, t } from "@/utils/helpers";
import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  clock: any;
  users: string[];
  image: any;
  onPress: () => void;
}

export const TimerSection: React.FC<Props> = ({
  users = [],
  image,
  clock,
  onPress,
}) => {
  const { locale } = useAppStore();
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        {clock && <Image source={clock} style={styles.backgroundImage} />}

        {image && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Image
              source={image}
              style={{
                height: 172,
                width: 192,
              }}
            />
          </View>
        )}

        <View style={[styles.textContainer, getFlexDirection(locale)]}>
          <Text style={[styles.text]}>
            {t("study_live_label").replace(
              "{__}",
              `${locale === "en" ? users.length : arabic_dates[users.length]}`
            )}
          </Text>
          <View style={styles.userContainer}>
            {users.map((user, index) => (
              <View
                key={index}
                style={{ ...styles.userAvatarContainer, left: 32 + index * 18 }}
              >
                <Image source={user} style={styles.userAvatar} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 32,
    paddingVertical: 12,
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
    width: 130,
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
  },
  textContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
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
