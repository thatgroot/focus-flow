import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

import { useNavigation, useRouter } from "expo-router";
import { useAppStore } from "@/store";
import { controllers } from "@/utils/crud";
import { t } from "@/utils/helpers";
import PromiseWaiter from "@/components/promises/PromiseWaiter";
import { auth } from "@/utils/firebase";

const grouppage: React.FC = () => {
  const router = useRouter();
  const { group } = useAppStore();
  const [loading, setLoading] = useState(false);

  const [liveSession, setLiveSession] = useState<{
    count: number;
    data: GroupSession[];
  }>();

  useEffect(() => {
    controllers.group.sessions
      .liveCount({
        groupId: group?.id!,
      })
      .then(function (data) {
        setLiveSession(data);
      });

    return () => {};
  }, []);

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
          <View style={styles.mainStudy}>
            <Image
              style={styles.LeftIcon}
              source={require("@/assets/images/team.png")}
            />
            <Text style={styles.heading}>{t("study_together")}</Text>
          </View>
          <View />
        </View>
        <Text style={styles.headingOwner}>{t("group_owner_label")}</Text>
        <View style={styles.together}>
          <Text style={styles.headingCaster}>
            {auth.currentUser?.displayName}
          </Text>
          <View style={styles.boxDays}>
            <Text style={[styles.heading, styles.daytext]}>
              {group?.time}/day
            </Text>
          </View>
        </View>

        <View style={styles.mainlive}>
          <TouchableOpacity style={styles.btnLive}>
            <View style={styles.dotlive}>
              <View style={styles.dotlivesub}></View>
            </View>
            <Text style={styles.livestyles}>
              {t("live_members_count").replace(
                "{__}",
                `${liveSession?.count ?? 0}`
              )}
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <PromiseWaiter />
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={async () => {
              setLoading(true);
              await controllers.group.join({
                id: group?.id!,
                onSuccess: (id) => {
                  setLoading(false);
                  router.push("/pages/live_study");
                },
                onError: (error) => {
                  setLoading(false);
                  if (error === "You are already a group member") {
                    router.push("/pages/live_study");
                  } else {
                  }
                },
              });
            }}
          >
            <Text style={styles.joinStyles}>{t("join_live")}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.BtnLeaderboard}>
          <Text style={styles.LeaderboardStyles}>{t("view_leaderboard")}</Text>
        </TouchableOpacity>
        <Text style={styles.LeaveStyles}>{t("leave_group")}</Text>
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
    color: "#8D99DE",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 18,
    letterSpacing: 1,
  },
  daytext: {
    fontWeight: "400",
  },

  headingCaster: {
    color: "rgba(53, 53, 53, 1)",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 20,
  },
  boxDays: {
    height: 44,
    backgroundColor: "#FFCA65",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  headingOwner: {
    color: "rgba(92, 92, 92, 1)",
    fontWeight: "400",
    lineHeight: 24.2,
    fontSize: 12,
    marginTop: 50,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  together: {
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
  mainlive: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  btnLive: {
    width: 158,
    height: 37,
    backgroundColor: "rgba(19, 206, 102, 0.31)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 100,
    gap: 10,
    marginTop: 27,
  },
  dotlive: {
    borderWidth: 1,
    borderColor: "rgba(19, 206, 102, 0.5)",
    borderRadius: 100,
    width: 14.82,
    height: 14.82,
    alignItems: "center",
    justifyContent: "center",
  },
  dotlivesub: {
    width: 9.82,
    height: 9.82,
    backgroundColor: "rgba(19, 206, 102, 1)",
    borderRadius: 100,
  },
  livestyles: {
    color: "rgba(19, 206, 102, 1) ",
    fontWeight: "400",
    lineHeight: 24,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  joinStyles: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "600",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  LeaderboardStyles: {
    color: "rgba(141, 153, 222, 1)",
    fontWeight: "600",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Bold",
  },
  LeaveStyles: {
    color: "rgba(227, 72, 80, 1)",
    fontWeight: "600",
    lineHeight: 20,
    fontSize: 16,
    marginTop: 40,
    textAlign: "center",
  },
  btn: {
    width: "100%",
    height: 40,
    backgroundColor: "rgba(139, 152, 221, 0.77)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 27,
  },
  BtnLeaderboard: {
    borderWidth: 1,
    borderColor: "rgba(141, 153, 222, 1)",
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 72,
  },
});

export default grouppage;
