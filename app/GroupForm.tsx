import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { router } from "expo-router";
import { useAppStore } from "@/store";
import Button from "@/elements/Button";
import { controllers } from "@/utils/crud";
import { auth } from "@/utils/firebase";
import { t } from "@/utils/helpers";
import LabeledInput from "@/components/InputField";

const GroupForm: React.FC = () => {
  const { group, setGroup } = useAppStore();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="padding" enabled  >
        <ScrollView style={styles.container}>
          <View style={styles.mainView}>
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.LeftIcon}
                source={require("../assets/images/iconleft.png")}
              />
            </TouchableOpacity>
            <View style={styles.mainStudy}>
              <Image
                style={styles.LeftIcon}
                source={require("../assets/images/team.png")}
              />
              <Text style={styles.heading}>Study Together</Text>
            </View>
            <View />
          </View>
          <View style={{ marginTop: 48, justifyContent: "center", alignItems: "center", gap: 24 }}>


            <LabeledInput
              label={t("group_title_label")}
              placeholder={t("group_title_label")}
              inputType="text"
              error="Name is require!"
              inputState="inactive"
              onChangeText={(text: string) => {
                setGroup({
                  ...group!,
                  title: text,
                });
              }}
            />

            <View style={{ flex: 1, alignSelf: "stretch" }}>
              <LabeledInput
                label={t("group_bio_label")}
                placeholder={t("group_bio_label")}
                multiline={true}
                inputType="text"
                error="Bio is require!"
                inputState="inactive"
                onChangeText={(text: string) => {
                  setGroup({
                    ...group!,
                    bio: text,
                  });
                }}
              />
              <Text style={styles.TimeStyles}>1/17</Text>
            </View>

            <View style={{ flex: 1, alignSelf: "stretch", gap: 6 }}>
              <Text style={[styles.StylesTitle,]}>Add Time</Text>
              <SelectDropdown
                data={[10, 20, 30, 40, 50, 60].map((i) => `${i} minutes`)}
                onSelect={(time, index) => {
                  setGroup({
                    ...group!,
                    time,
                  });
                }}
                defaultButtonText={group?.time ? group?.time : "10 minutes"}
                buttonTextAfterSelection={(time, index) => {
                  return time;
                }}
                rowTextForSelection={(time, index) => {
                  return time;
                }}
                buttonStyle={styles.dropDownlist}
              />
            </View>

            <Button
              disabled={false}
              text="Next"
              onPress={() => {
                if (group) {
                  controllers.group.add({
                    data: {
                      ...group!,
                      uid: auth.currentUser?.uid!,
                    },
                    onError: (error) => {
                      Alert.alert(error);
                    },
                    onSuccess: (id) => {
                      Alert.alert(id.toString())
                      router.push("/groups");
                    },
                  });
                } else {
                  Alert.alert("group details are missing");
                }
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mainStudy: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  heading: {
    color: "#8D99DE",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 20,
    letterSpacing: 1,
  },
  StylesTitle: {
    color: "rgba(53, 53, 53, 1)",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
    marginLeft: 10,
  },

  mainSearch: {
    borderWidth: 2,
    borderColor: "rgba(154, 165, 181, 1)",
    width: "100%",
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 17,
  },
  mainSearchBio: {
    borderWidth: 2,
    borderColor: "rgba(154, 165, 181, 1)",
    width: "100%",
    height: 124,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  TextInput: {
    flex: 1,
    color: "#9AA5B5",
    fontSize: 16,
    fontWeight: "300",
  },
  TextInputBio: {
    color: "#9AA5B5",
    fontSize: 16,
    fontWeight: "300",
  },
  TimeStyles: {
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 2,
    color: "rgba(154, 165, 181, 1)",
    fontFamily: "Inter-Medium",
    lineHeight: 20,
    fontSize: 14,
  },
  dropDownlist: {
    borderWidth: 2,
    borderColor: "rgba(154, 165, 181, 1)=",
    width: "100%",
    height: 60,
    backgroundColor: "#FAFAFA",
    borderRadius: 100,
  },
});

export default GroupForm;
