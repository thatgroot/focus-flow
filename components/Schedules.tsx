import React, { useState } from "react";
import { View, Text, StyleSheet,Image, Pressable, TouchableOpacity,Modal } from "react-native";
import { useRouter,useNavigation } from "expo-router";



export const Schedules = ({item}) => {
  console.log('dhjshsd',item,)

   
  

  return (
    <View style={styles.container}>
      
      <View style={[styles.card, { backgroundColor: item?.bgColor ,gap:24,}]}>
        {item?.title?.map((subject, index) => (
          <View key={index} style={{ ...styles.item, flexDirection: "column",gap:2 }}>
            <View style={styles.headerTitle}>
            <Text style={styles.subtitle}>{subject}</Text>
            <TouchableOpacity onPress={() =>{} }>
            <Image source={item?.icon} style={styles.shareIcon} />

            </TouchableOpacity>
            </View>
            <View style={styles.subDetails}>
              <View style={styles.subDetail}>
                <View
                  style={[
                    styles.subDetailBox,
                    { backgroundColor: "rgba(0, 0, 0, 0.28)" },
                  ]}
                >
                  <Text style={styles.subDetailText}>{item?.time[index]}</Text>
                </View>
              </View>
              <View style={styles.subDetail}>
               {
                 item.due[index] && (
                  <View
                  style={[
                    styles.subDetailBox,
                    { backgroundColor: "#e3485020" },
                  ]}
                >

                 
                      <Text style={[styles.subDetailText, { color: "#fff" }]}>
                   {item?.due[index]}
                  </Text>
                   
                  
                </View>
                 )
               }
              </View>
            </View>
          </View>
        ))}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
  },
  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    padding: 10,
    borderRadius: 10,
    width: "90%",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "flex-start",
    minWidth:275,
    gap:12,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 0,
    flexShrink: 0,
    height: 25,
    width: 25,
    borderRadius: 1000,
    backgroundColor: "#8d99de",
  },
  iconText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    flexShrink: 1,
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
  },
  detailText: {
    fontSize: 12,
    color: "white",
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 0,
    flexShrink: 0,
    width: "100%",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  subDetail: {
    marginRight: 10,
  },
  subDetailBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  subDetailText: {
    fontSize: 12,
    color: "white",
  },
  shareIcon:{
    width:22,
    height:24,
    tintColor:'rgba(255, 255, 255, 1)',
    marginRight:30
  },
  headerTitle:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
 
});
