import { useAppStore } from "@/store";
import { getFlexDirection, setTranslationHandler, t } from "@/utils/helpers";
import { translations } from "@/utils/localization";
import {  router } from "expo-router";
import { I18n } from "i18n-js";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LanguageSelector({ route }: { route: any }) {
  const languages = {
    en: "English",
    ar: "عربي", // Arabic for "Arabic"
  };
  const { setLocale, locale } = useAppStore();
  const direction = useMemo(() => getFlexDirection(locale), [locale]);

  function changeLocale(_locale: "en" | "ar") {
    const i18n = new I18n(translations);
    i18n.locale = _locale;
    setTranslationHandler(i18n);
    setLocale(_locale);
    router.push(route);
  }
  return (
    <View style={[styles.container,direction]}>
      {Object.keys(languages).map((key, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              changeLocale(key as any);
            }}
          >
            <Text style={[styles.locale,{
              color:locale === key ? "black" :"rgba(53, 53, 53, 0.8)"
            }]}>{languages[key as "ar" | "en"]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 24,
  },
  headingTimer: {
    color: "rgba(53, 53, 53, 1)",
    fontWeight: "700",
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Inter-Bold",
    letterSpacing: 1,
    marginTop: 40,
  },
  AccountView: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },
  IconView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  BoxView: {
    backgroundColor: "white",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 5,
  },
  userIcon: {
    width: 14,
    height: 14,
  },

  locale: {
    color: "rgba(53, 53, 53, 0.8)",
    fontFamily: "Inter-Medium",
    lineHeight: 16.94,
    fontSize: 14,
  },
  headingEdit: {
    color: "rgba(53, 53, 53, 0.61)",
    fontFamily: "Inter-Medium",
    lineHeight: 16.94,
    fontSize: 16,
  },
});
