import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { calculateAngle, calculatePosition } from "@/utils";

import { useRouter } from "expo-router";
import { CircularImageWithOverlays } from "@/components/CircularImageWithOverlays";
import { controllers } from "@/utils/crud";
import { useAppStore } from "@/store";
import { calculateTotalTime, formatMsToTimeString, t } from "@/utils/helpers";
import PromiseWaiter from "@/components/promises/PromiseWaiter";

const liveNowPage: React.FC = () => {
  const { group } = useAppStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<SessionStatus>("inactive");
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeSpent, setTimeSpent] = useState("");
  const previousTimeRef = useRef(0);
  const [liveSession, setLiveSession] = useState<{
    count: number;
    data: GroupSession[];
  }>();

  useEffect(() => {
    controllers.group.sessions.getFor(group?.id!).then(function (data) {
      if (data) {
        setTimeSpent(data.timeSpent ?? "");
      }
    });

    return () => {};
  }, [status]);

  function fetchLiveSessionData() {
    controllers.group.sessions
      .liveCount({
        groupId: group?.id!,
      })
      .then(function (data) {
        console.log("status ->", status);
        setLiveSession(data);
      });
  }

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - previousTimeRef.current;
        setElapsedTime((prevElapsed) => prevElapsed + elapsed);
        previousTimeRef.current = now;
      }, 1000); // Update every second
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    previousTimeRef.current = new Date().getTime();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setElapsedTime(0);
    previousTimeRef.current = new Date().getTime();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
          {status !== "active" && (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                style={styles.LeftIcon}
                source={require("@/assets/images/iconleft.png")}
              />
            </TouchableOpacity>
          )}
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
          <Text style={styles.headingCaster}>Elven Caster</Text>
          <View style={styles.boxDays}>
            <Text style={[styles.heading, styles.daytext]}>
              {group?.time}/day
            </Text>
          </View>
        </View>
        <View style={styles.images}>
          <CircularImageWithOverlays
            mainImage={require("@/assets/images/group-illustration.png")}
            orbitImages={[
              { source: require("@/assets/images/user1.png") }, // Destructure unnecessary properties
              { source: require("@/assets/images/user2.png") },
              { source: require("@/assets/images/user3.png") },
              { source: require("@/assets/images/user4.png") },
            ].map((image, index) => ({
              source: image.source,
              position: calculatePosition(
                270,
                128,
                calculateAngle(index, 4),
                4
              ),
            }))}
          />
        </View>
        <Text style={styles.subheading}>{t("focus_mode_title")}</Text>
        <View style={styles.mainlive}>
          <TouchableOpacity
            style={styles.btnLive}
            onPress={() => router.push("/ParticipantsPage")}
          >
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
        <View>
          <Text style={styles.headingTime}>
            {!isRunning && timeSpent
              ? timeSpent
              : formatMsToTimeString(elapsedTime)}
          </Text>
        </View>

        {loading ? (
          <PromiseWaiter />
        ) : (
          <View style={styles.BoxView}>
            {status === "inactive" && (
              <TouchableOpacity
                style={styles.btnView}
                onPress={async () => {
                  setLoading(true);
                  const time = calculateTotalTime(
                    elapsedTime,
                    timeSpent === "" ? "00:00:00" : timeSpent
                  );
                  await controllers.group.sessions.add({
                    groupId: group?.id!,
                    data: {
                      timeSpent: formatMsToTimeString(time),
                      status: "active",
                    },
                    onError(error) {
                      setLoading(false);
                      console.log(error);
                    },
                    onSuccess(id) {
                      setLoading(false);
                      setStatus("active");
                      handleStart();
                      fetchLiveSessionData();
                    },
                  });
                }}
              >
                <Image
                  style={styles.icon}
                  source={require("@/assets/images/play.png")}
                />
              </TouchableOpacity>
            )}
            {status === "active" && (
              <TouchableOpacity
                style={styles.btnView}
                onPress={async () => {
                  setLoading(true);

                  const time = calculateTotalTime(
                    elapsedTime,
                    timeSpent === "" ? "00:00:00" : timeSpent
                  );
                  await controllers.group.sessions.add({
                    groupId: group?.id!,
                    data: {
                      timeSpent: formatMsToTimeString(time),
                      status: "inactive",
                    },
                    onError(error) {
                      setLoading(false);

                      console.log(error);
                    },
                    onSuccess(id) {
                      setLoading(false);
                      handleStop();
                      setStatus("inactive");
                      fetchLiveSessionData();
                    },
                  });
                }}
              >
                <Image
                  style={styles.icon}
                  source={require("@/assets/images/stop.png")}
                />
              </TouchableOpacity>
            )}
            {status === "active" && (
              <TouchableOpacity
                style={[styles.btnView, styles.BoxViewcolor]}
                onPress={async () => {
                      setLoading(true);
                      const time = calculateTotalTime(
                    elapsedTime,
                    timeSpent === "" ? "00:00:00" : timeSpent
                  );
                  await controllers.group.sessions.add({
                    groupId: group?.id!,
                    data: {
                      timeSpent: formatMsToTimeString(time),
                      status: "paused",
                    },
                    onError(error) {
                      setLoading(false);
                      console.log(error);
                    },
                    onSuccess(id) {
                      setLoading(false);
                      handlePause();
                      setStatus("inactive");
                      fetchLiveSessionData();
                    },
                  });
                }}
              >
                <Image
                  style={styles.icon}
                  tintColor={"rgba(241, 137, 124, 1)"}
                  source={require("@/assets/images/pause.png")}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
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
  subheading: {
    color: "rgba(53, 53, 53, 1)",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 16,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 20,
  },
  headingTime: {
    color: "rgba(53, 53, 53, 1)",
    fontFamily: "Inter-Medium",
    fontSize: 32,
    letterSpacing: 1,
    textAlign: "center",
    marginTop: 20,
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
  images: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
    backgroundColor: "rgba(227, 72, 80, 0.32)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 100,
    gap: 10,
    marginTop: 27,
  },
  dotlive: {
    borderWidth: 1,
    borderColor: "rgba(241, 137, 124, 1)",
    borderRadius: 100,
    width: 14.82,
    height: 14.82,
    alignItems: "center",
    justifyContent: "center",
  },
  dotlivesub: {
    width: 9.82,
    height: 9.82,
    backgroundColor: "rgba(241, 137, 124, 1)",
    borderRadius: 100,
  },
  livestyles: {
    color: "rgba(241, 137, 124, 1)",
    fontWeight: "400",
    lineHeight: 24,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  btnView: {
    width: 40.24,
    height: 40.24,
    borderRadius: 100,
    borderColor: "rgba(112, 227, 141, 1)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 11.33,
    height: 7.92,
  },
  BoxViewcolor: {
    borderColor: "rgba(241, 137, 124, 1)",
    borderWidth: 1,
  },
  BoxView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginTop: 30,
    marginBottom: 50,
  },
});

export default liveNowPage;
