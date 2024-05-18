import { t } from "@/utils/helpers";
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <View style={styles.container}>
        <Text>Oops! no page found!</Text>
        <Button title={t("go_back")} onPress={() => {
          router.back()
        }} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
