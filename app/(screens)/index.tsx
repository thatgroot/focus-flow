import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontSize, Border } from "@/styles/GlobalStyles";
import { router } from "expo-router";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { getNetworkStateAsync } from "expo-network";
import Button from "@/elements/Button";

const Splash = () => {
  const [reachable, setReachable] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);

  const checkNetwork = async () => {
    const state = await getNetworkStateAsync();
    const isInternetReachable = state.isInternetReachable ?? false;
    setReachable(isInternetReachable);
    setWaiting(!isInternetReachable);
    return isInternetReachable;
  };

  const handleNavigation = async () => {
    const isInternetReachable = await checkNetwork();
    if (isInternetReachable) {
      if (!auth.currentUser?.uid) {
        router.replace("/(screens)/auth/signin");
      } else {
        router.replace("/home_screen");
      }
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNavigation();
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.splash}>
      <Image
        style={{
          width: 225,
          height: 225,
        }}
        contentFit="contain"
        source={require("@/assets/images/group1.png")}
      />

      <View>
        <Text style={styles.flowTypo}>FOCUS</Text>
        <Text style={styles.flowTypo}>FLOW</Text>
      </View>
      {!reachable && waiting && (
        <View
          style={{
            alignSelf: "stretch",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "600",
              marginBottom: 10,
            }}
          >
            Please connect to the internet
          </Text>
          <Button
            text="Try again?"
            onPress={handleNavigation}
            disabled={false}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flowTypo: {
    textAlign: "center",
    color: Color.colorCornflowerblue_100,
    fontWeight: "700",
    fontSize: FontSize.size_17xl,
  },
  splash: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.bacgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});

export default Splash;
