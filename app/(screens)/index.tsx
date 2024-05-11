import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontSize, Border } from "@/styles/GlobalStyles";
import { router } from "expo-router";
import { auth } from "@/utils/firebase";
import { useEffect } from "react";

const Splash = () => {

  useEffect(() => {

    setTimeout(() => {
      if (!auth.currentUser?.uid) {
        router.replace("/(screens)/auth/signin");
      } else {
        router.replace("/home_screen");
      }
    }, 1000);
  }, []);
  return (
    <View style={[styles.splash]}>
      <Image
        style={{
          width: 225,
          height: 225,
        }}
        contentFit="contain"
        source={require("@/assets/images/group1.png")}
      />
      <View style={{}}>
        <Text style={[styles.flowTypo]}>FOCUS</Text>
        <Text style={[styles.flowTypo]}>FLOW</Text>
      </View>
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
