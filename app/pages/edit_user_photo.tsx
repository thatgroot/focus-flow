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
  Button,
} from "react-native";

import { Link, useNavigation, useRouter } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import { auth } from "@/utils/firebase";
import { Avatar } from "@/components/Avatar";

const EditProfileUploads: React.FC = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
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
              style={styles.LeftIcon}
              source={require("@/assets/icons/back.png")}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Settings</Text>

          <View />
        </View>
        <Text style={[styles.heading, styles.ManageAccout]}>Edit Profile</Text>

        <View style={styles.mainsection}>
          <View style={styles.ProfileMain}>
            <Avatar />
            <View>
              <Text style={styles.heading}>
                {auth.currentUser?.displayName}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.ProfileEdit}
              source={require("@/assets/icons/pencil.png")}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={[styles.heading, styles.BtnText]}>Save Changes</Text>
        </TouchableOpacity>
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
  LeftIcon: {
    width: 18,
    height: 18,
  },
  heading: {
    color: "rgba(53, 53, 53, 1)",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 16,
    letterSpacing: 1,
  },
  uploadText: {
    color: "rgba(141, 153, 222, 1)",
    fontWeight: "700",
    lineHeight: 24.2,
    fontSize: 16,
    marginLeft: 20,
  },
  BtnText: {
    color: "rgba(255, 255, 255, 1)",
  },
  ManageAccout: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 37,
  },
  mainStudy: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  mainsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  headingSub: {
    color: "rgba(119, 131, 143, 1)",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
  },
  Arrow: {
    width: 13,
    height: 12,
  },

  ProfileMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  Profile: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  ProfileEdit: {
    width: 14,
    height: 14,
  },

  ProfileMainView: {
    flexDirection: "row",
  },

  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },

  btn: {
    width: 196,
    height: 50,
    backgroundColor: "rgba(139, 152, 221, 0.77)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 90,
    alignSelf: "center",
  },
});

export default EditProfileUploads;
