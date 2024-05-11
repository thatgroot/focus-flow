import { Tabs } from "expo-router";
import { Image } from "expo-image";
import { View } from "react-native";
import { t } from "@/utils/helpers";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8D99DE",
        tabBarStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: " #FFFFFF",
          borderTopWidth: 0,
          paddingVertical:12,
        },
      }}
    >
      <Tabs.Screen
        name="home_screen"
        options={{
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <View>
              <Image
                source={require("@/assets/icons/home.png")}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? "#8D99DE" : "#9AA5B5",
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: t("schedule"),
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("@/assets/icons/schedule.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#8D99DE" : "#9AA5B5",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: t("groups"),
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("@/assets/icons/groups.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#8D99DE" : "#9AA5B5",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("@/assets/icons/settings.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? "#8D99DE" : "#9AA5B5",
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
