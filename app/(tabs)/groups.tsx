import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { StudyGroup } from "@/components/StudyGroup";
import { FeaturedGroup } from "@/components/FeaturedGroup";
import { Link, useNavigation, useRouter } from "expo-router";
import Button from "@/elements/Button";
const DATA: StudyGroupProps[] = [
  {
    gradient: ["#9AA5B5", "#9AA5B5"],
    type: "Study",
    title: "Study Together",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#8a97dd", "#8a97dd85"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#FFCA65", "#FFCA65"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#FEB5A6", "#FEB5A6"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
];

const groups: React.FC = () => {
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.iconleft}
          source={require("../../assets/images/iconleft.png")}
        />
        <View style={styles.MainHeading}>
          <Text style={styles.heading}>Your Groups</Text>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => router.push("/GroupDetails")}
          >
            <Image
              style={styles.iconleft}
              source={require("../../assets/images/plus.png")}
            />

            <Text style={[styles.heading, styles.btnTxt]}>Create</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainSearch}>
          <EvilIcons name="search" size={24} color="#9AA5B5" />
          <TextInput
            placeholder="Search a group by name "
            style={styles.TextInput}
            placeholderTextColor={"#9AA5B5"}
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
            <Text style={styles.headingGroups}>Joined groups(4)</Text>
            <Text style={styles.subheading}>
              The groups that you have joined.
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
            {DATA.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => router.push("/GroupPage")}>
                <StudyGroup {...item} />
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
            <Text style={styles.headingGroups}>Featured Groups</Text>
            <Text style={styles.subheading}>Top trending Study groups.</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 12,
            }}
          >
            {DATA.map((item, index) => (
              <TouchableOpacity  key={index} onPress={() => router.push("/GroupPage")}>
                <FeaturedGroup {...item} />
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
