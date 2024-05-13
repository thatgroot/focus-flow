import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import Svg, {
  Circle,
  Defs,
  Stop,
  LinearGradient as SvgGradient,
} from "react-native-svg";

const PromiseWaiter = () => {
  const spinValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spinnerContainer, { transform: [{ rotate: spin }] }]}
      >
        <Svg height="50" width="50">
          <Defs>
            <SvgGradient id="gradient" x1="10%" y1="0%" x2="30%" y2="20%">
              <Stop offset="50%" stopColor="#0F31F3" />
              <Stop offset="100%" stopColor="#9e94fb" />
            </SvgGradient>
          </Defs>
          <Circle
            cx="25"
            cy="25"
            r="20"
            fill="transparent"
            stroke="url(#gradient)"
            strokeWidth="5"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   paddingTop:24,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PromiseWaiter;
