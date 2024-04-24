import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";
import grouppage from "./GroupPage";


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(screens)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    regular: require("../assets/fonts/Inter-Regular.ttf"),
    bold: require("../assets/fonts/Inter-Bold.ttf"),
    light: require("../assets/fonts/Inter-Light.ttf"),
    medium: require("../assets/fonts/Inter-Medium.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:false}}>
        {/* <Stack.Screen name="(screens)" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Home screen",
            headerShown:false,
          }}
        />
        <Stack.Screen
          name="grouppage "
          options={{
            
            headerShown:false,
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", header: () => <></> }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
