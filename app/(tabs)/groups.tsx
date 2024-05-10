import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { StudyGroup } from "@/components/StudyGroup";
import { FeaturedGroup } from "@/components/FeaturedGroup";
import { useRouter } from "expo-router";
import { useAppStore } from "@/store";
import { arabic_dates, t } from "@/utils/helpers";
const gradients = [
  ["#9AA5B5", "#9AA5B5"],
  ["#8a97dd", "#8a97dd85"],
  ["#FFCA65", "#FFCA65"],
  ["#FEB5A6", "#FEB5A6"],
];

const groups = () => {
  const { group, setGroup, groups, joinedGroups, searchGroups, locale } =
    useAppStore();
  const router = useRouter();

  useEffect(() => {
    joinedGroups();
    return () => {};
  }, []);

  useEffect(() => {
    console.log("groups", groups);
    return () => {};
  }, [groups]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.iconleft}
          source={require("../../assets/images/iconleft.png")}
        />
        <View style={styles.MainHeading}>
          <Text style={styles.heading}>{t("groups_title")}</Text>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => router.push("/GroupForm")}
          >
            <Image
              style={styles.iconleft}
              source={require("../../assets/images/plus.png")}
            />

            <Text style={[styles.heading, styles.btnTxt]}>{t("create_group_button")}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainSearch}>
          <EvilIcons name="search" size={24} color="#9AA5B5" />
          <TextInput
            placeholder={t("search_group_placeholder")}
            style={styles.TextInput}
            placeholderTextColor={"#9AA5B5"}
            onChangeText={(text) => {
              searchGroups(text);
            }}
          />
        </View>
        <View
          style={{
            gap: 18,
          }}
        >
          <View
            style={{
              gap: 4,
            }}
          >
            <Text style={styles.headingGroups}>
              {t("joined_groups_title").replace(
                "{__}",
                `${
                  locale === "en" ? groups.length : arabic_dates[groups.length]
                }`
              )}
            </Text>
            <Text style={styles.subheading}>
              {t("joined_groups_description")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            }}
          >
            {groups?.map((group, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setGroup({
                    ...group,
                  });
                  router.push("/GroupBoard");
                }}
                style={{
                  width: "48%",
                }}
              >
                <StudyGroup
                  memberCount={group.memberCount}
                  users={[
                    require("@/assets/images/user1.png"),
                    require("@/assets/images/user2.png"),
                    require("@/assets/images/user3.png"),
                    require("@/assets/images/user4.png"),
                  ]}
                  title={group.title}
                  bio={""}
                  time=""
                  gradient={gradients[index]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            gap: 18,
          }}
        >
          <View
            style={{
              gap: 4,
            }}
          >
            <Text style={styles.headingGroups}>
              {t("featured_groups_title")}
            </Text>
            <Text style={styles.subheading}>
              {t("top_trending_study_groups_title")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            }}
          >
            {groups?.map(({ title, time, bio, memberCount }, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setGroup({
                    ...group,
                    memberCount,
                    time,
                    title,
                    bio,
                  });
                  router.push("/GroupBoard");
                }}
                style={{
                  width: "48%",
                }}
              >
                {/* Featured Group instead : @TODO */}
                <FeaturedGroup
                  memberCount={memberCount}
                  users={[
                    require("@/assets/images/user1.png"),
                    require("@/assets/images/user2.png"),
                    require("@/assets/images/user3.png"),
                    require("@/assets/images/user4.png"),
                  ]}
                  title={title}
                  bio={""}
                  time=""
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
  iconleft: {
    width: 18,
    height: 18,
  },
  MainHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 28,
  },
  heading: {
    color: "#8D99DE",
    fontWeight: "700",
    lineHeight: 24.2,
    fontSize: 20,
    fontFamily: "Inter-Bold",
    letterSpacing: 1,
  },

  btnTxt: {
    color: "#FFFFFF",
    fontWeight: "400",
    lineHeight: 16.94,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    letterSpacing: 1,
  },
  plusBtn: {
    backgroundColor: "#8A97DD",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    width: 95,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
  },
  mainSearch: {
    borderWidth: 1,
    borderColor: "#9AA5B5",
    width: "100%",
    height: 52.5,
    borderRadius: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  TextInput: {
    flex: 1,
    color: "#9AA5B5",
    fontSize: 16,
    fontWeight: "300",
  },
  headingGroups: {
    color: "#353535",
    fontWeight: "600",
    lineHeight: 24.2,
    fontSize: 20,
    fontFamily: "Inter-Bold",
    marginTop: 30,
  },
  subheading: {
    color: "#9AA5B5",
    marginTop: 4,
    fontWeight: "400",
    lineHeight: 16.94,
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});

export default groups;
