import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAppStore } from "@/store";
import {
  arabic_dates,
  getColumnAlignment,
  getFlexDirection,
  getTextAlignment,
  t,
} from "@/utils/helpers";
import { StudyGroup } from "@/components/StudyGroup";
import { FeaturedGroup } from "@/components/FeaturedGroup";
import PromiseWaiter from "@/components/promises/PromiseWaiter";

const gradients = [
  ["#9AA5B5", "#9AA5B5"],
  ["#8a97dd", "#8a97dd85"],
  ["#FFCA65", "#FFCA65"],
  ["#FEB5A6", "#FEB5A6"],
];

const Groups = () => {
  const {
    setGroup,
    groups,
    my_groups,
    joinedGroups,
    loadMyGroups,
    searched_groups,
    searchGroups,
    locale,
  } = useAppStore();

  const [query, setQuery] = useState("");

  const direction = useMemo(() => getFlexDirection(locale), [locale]);
  const alignment = useMemo(() => getTextAlignment(locale), [locale]);
  const columnAignment = useMemo(() => getColumnAlignment(locale), [locale]);

  const router = useRouter();

  useEffect(() => {
    loadMyGroups();
    joinedGroups();

    return () => {};
  }, []);

  const renderJoinedGroups = () => {
    return (
      <View style={[{ gap: 18, marginTop: 36 }, getColumnAlignment(locale)]}>
        <View
          style={[
            {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            },
            direction,
          ]}
        >
          {searched_groups.map((group, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGroupPress(group)}
              style={{ width: "48%" }}
            >
              <StudyGroup
                time=""
                memberCount={group.memberCount}
                users={getGroupUsers()}
                title={group.title}
                bio={group.bio}
                gradient={gradients[index % gradients.length]}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={[{ gap: 4 }, getColumnAlignment(locale)]}>
          <Text style={[styles.headingGroups, alignment]}>
            {t("joined_groups_title").replace(
              "{__}",
              `${locale === "en" ? groups.length : arabic_dates[groups.length]}`
            )}
          </Text>
          <Text style={styles.subheading}>
            {t("joined_groups_description")}
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            },
            direction,
          ]}
        >
          {groups.map((group, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGroupPress(group)}
              style={{ width: "48%" }}
            >
              <StudyGroup
                time=""
                memberCount={group.memberCount}
                users={getGroupUsers()}
                title={group.title}
                bio={group.bio}
                gradient={gradients[index % gradients.length]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderFeaturedGroups = () => {
    return (
      <View style={{ gap: 18 }}>
        <View style={[{ gap: 4 }, columnAignment]}>
          <Text style={[styles.headingGroups, alignment]}>
            {t("featured_groups_title")}
          </Text>
          <Text style={styles.subheading}>
            {t("top_trending_study_groups_title")}
          </Text>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            },
            direction,
          ]}
        >
          {my_groups?.map((group, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleGroupPress(group)}
              style={{ width: "48%" }}
            >
              <FeaturedGroup
                time=""
                memberCount={group.memberCount}
                users={getGroupUsers()}
                title={group.title}
                bio={group.bio}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const handleGroupPress = (group: Group) => {
    setGroup(group);
    router.push("/pages/group_board");
  };

  const getGroupUsers = () => {
    return [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ];
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={{
            height: 32,
            width: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => router.back()}
        >
          <Image
            source={require("@/assets/icons/back.png")}
            style={styles.iconLeft}
          />
        </TouchableOpacity>

        <View style={[styles.mainHeading, direction]}>
          <Text style={styles.heading}>{t("groups_title")}</Text>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => router.push("/pages/create_group")}
          >
            <Image
              style={styles.iconPlus}
              source={require("@/assets/images/plus.png")}
            />
            <Text style={styles.btnTxt}>{t("create_group")}</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mainSearch, direction]}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <EvilIcons name="search" size={24} color="#9AA5B5" />
            <TextInput
              placeholder={t("search_group_placeholder")}
              style={styles.textInput}
              placeholderTextColor={"#9AA5B5"}
              onChangeText={(text) => {
                setQuery(text);
              }}
            />
          </View>
          <TouchableOpacity
            disabled={false}
            style={{
              height: 40,
              borderRadius: 20,
              paddingHorizontal: 12,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#8a97dd",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
            }}
            onPress={() => {
              if (query) {
                searchGroups(query);
              } else {
                joinedGroups();
              }
            }}
          >
            <Text style={{ color: "white" }}>Search</Text>
          </TouchableOpacity>
        </View>

        {groups.length === 0 ? (
          <PromiseWaiter />
        ) : (
          <>
            {renderJoinedGroups()}
            {renderFeaturedGroups()}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
    padding: 22,
  },
  iconLeft: {
    width: 18,
    height: 18,
  },
  mainHeading: {
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
  iconPlus: {
    width: 18,
    height: 18,
  },
  btnTxt: {
    color: "#FFFFFF",
    fontWeight: "400",
    lineHeight: 16.94,
    fontSize: 14,
    fontFamily: "Inter-Regular",
    letterSpacing: 1,
  },
  mainSearch: {
    borderWidth: 1,
    borderColor: "#9AA5B5",
    borderRadius: 100,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
  },
  textInput: {
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

export default Groups;
