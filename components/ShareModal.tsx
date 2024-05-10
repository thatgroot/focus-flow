import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { IHandles } from "react-native-modalize/lib/options";

export default function ShareModal({
  onBack,
}: {
  onBack: ((event: GestureResponderEvent) => void) | undefined;
}) {
  const _ref = useRef<Modalize>(null);
  useEffect(() => {
    _ref.current?.open();
  }, []);
  return (
    <Modalize
      modalHeight={425}
      ref={_ref}
      handleStyle={{
        marginTop: 30,
        backgroundColor: "#e9e9e9",
      }}
    >
      <View style={styles.container}>
        <View style={styles.shareContainer}>
          <TouchableOpacity onPress={onBack}>
            <Image
              style={styles.icon}
              source={require("@/assets/icons/back.png")}
            />
          </TouchableOpacity>
          <Text style={styles.shareText}>Share</Text>
        </View>
        <View style={styles.linkContainer}>
          <View style={styles.linkInnerContainer}>
            <Text style={styles.linkText}>focusflow.assk.645454</Text>
          </View>
          <View style={styles.copyLinkContainer}>
            <Text style={styles.copyLinkText}>Copy Link</Text>
            <Image
              style={styles.copyLinkIcon}
              source={require("@/assets/icons/copy.png")}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Image
            style={{
              width: 36,
              height: 36,
            }}
            source={require("@/assets/icons/whatsapp.png")}
          />
          <Image
            style={{
              width: 36,
              height: 36,
            }}
            source={require("@/assets/icons/insta.png")}
          />
          <Image
            style={{
              width: 36,
              height: 28,
            }}
            source={require("@/assets/icons/gmail.png")}
          />
          <Image
            style={{
              width: 36,
              height: 36,
            }}
            source={require("@/assets/icons/facebook.png")}
          />
        </View>
      </View>
    </Modalize>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#FFF",
    display: "flex",
    flex:1,
    fontSize: 16,
    padding: 32,
    gap:64
  },
  shareContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 124,
    position: "relative",
  },
  icon: {
    width: 18,
    height: 18,
  },
  shareText: {
    flex: 0,
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: "#8d99de",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex:1,
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#9aa5b5",
  },
  linkInnerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: 6,
    // borderRadius: 100,
    // borderWidth: 1,
    borderColor: "#9aa5b5",
  },
  linkText: {
    flex: 0,
    fontSize: 12,
    color: "#8d99de",
  },
  copyLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  copyLinkText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    color: "#8d99de",
  },
  copyLinkIcon: {
    width: 32,
    height: 30,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    gap: 36,
    alignItems: "center",
    width: "100%",
  },
});
