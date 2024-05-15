import Button from "@/elements/Button";
import { useAppStore } from "@/store";
import { setTranslationHandler } from "@/utils/helpers";
import { translations } from "@/utils/localization";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Image } from "expo-image";
import { NetworkState, getNetworkStateAsync } from "expo-network";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { I18n } from "i18n-js";

import { useEffect, useState } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setLocale } = useAppStore();
  const [loaded, error] = useFonts({
    "Inter-Light": require("@/assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter-Medium.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter-SemiBold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const i18n = new I18n(translations);
    setTranslationHandler(i18n);
    AsyncStorage.getItem("locale").then((v) => {
      if (v) {
        setLocale(v as any);
        i18n.locale = v as any;
      } else {
        setLocale("en");
        i18n.locale = "en";
      }
    });
  }, []);

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="(screens)" options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "home_screen",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", header: () => <></> }}
          />
        </Stack>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
