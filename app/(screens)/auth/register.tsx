import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Signup = () => {
  const router = useRouter();

  return (
    <ScrollView>
      <View style={{ flex: 1, gap: 18, paddingVertical: 48 }}>
        <Image
          style={{
            width: "100%",
            height: 350,
          }}
          source={require("@/assets/images/register_illustration.png")}
        />
        <View
          style={{
            gap: 56,
            paddingHorizontal: 18,
          }}
        >
          <View style={{ gap: 24, alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                flexGrow: 0,
                flexShrink: 0,
                position: "relative",
                gap: 7,
              }}
            >
              <Text style={styles.title}>Create an Account</Text>
              <Text style={styles.description}>
                Enter Your Credentials to Continue:
              </Text>
            </View>

            <LabeledInput
              label="Full Name"
              placeholder="Full Name"
              inputType="text"
              error="Name is require!"
            />

            <LabeledInput
              label="Enter Email"
              placeholder="teebaapp123@gmail.com"
              inputType="email"
              error="Invalid Email. Try another one"
            />

            <LabeledInput
              label="Enter Password"
              placeholder="Password"
              inputType="password"
              error=""
            />

            <LabeledInput
              label="Confirm Password"
              placeholder="Confirm Password"
              inputType="password"
              error=""
            />
          </View>

          <View
            style={{
              alignItems: "center",
              gap: 24,
            }}
          >
            <Button
              onPress={() => {
                router.push("/auth/signin");
              }}
              text="Signup"
            />
            <View style={styles.alternateAction}>
              <Text style={styles.text1}>Already have an Account ?</Text>
              <Text style={styles.text2}>Sign In</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    textAlign: "left",
    color: "#8c99de",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  alternateAction: {
    gap: 24,
    justifyContent: "center",
    flexDirection: "row",
  },
  text1: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  text2: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "left",
    color: "#8c99de",
  },
});

export default Signup;
