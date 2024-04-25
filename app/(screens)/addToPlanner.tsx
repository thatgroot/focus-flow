import { SafeAreaView, StyleSheet, Text, View,Image, ScrollView } from 'react-native'
import React from 'react'
import CheckboxGroup from '@/components/CheckBoxGroup'
import Checkbox from '@/components/CheckBox'
import Button from '../../elements/Button';

const addToPlanner = () => {

  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log("Selected label:", JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };
  return (
   <SafeAreaView style={{flex:1,}}>
    <View style={styles.header}>
      <Image source={require('../../assets/icons/back.png')} style={styles.backBtn}/>
      <Text style={styles.headerTxt}>Add to Planner</Text>
     
    </View>
    <ScrollView>

   
    <View style={styles.mainContainer}>
      <CheckboxGroup onChange={handleCheckboxChange}>
            {["Pscychology", "Physiology","Physiologys","Biology", "Physics", "Mathematics"].map(
              (label, index) => (
                <Checkbox
                  isRadio={false}
                  isChecked={false}
                  onPress={() => {}}
                  key={index}
                  label={label}
                />
              )
            )}
          </CheckboxGroup>
      </View>
      <View style={styles.btn}>
      <Button text='Schedule' />
  
      </View>
      </ScrollView>
   </SafeAreaView>
  )
}

export default addToPlanner

const styles = StyleSheet.create({

     header:{
      flexDirection:'row',
      gap:50,
      marginTop:40,
      // justifyContent:'center',
      alignItems:'center',
      marginLeft:20
     },
     headerTxt:{
       fontWeight:'700',
       fontSize:20,
       lineHeight:24,
       fontFamily:'bold',
       color:'#8D99DE'
     },
     backBtn:{
      width:20,
      height:20
     },
     mainContainer:{
      flex:1,
      // justifyContent:'center',
      alignItems:'center',
      marginTop:30
      

     },
     btn:{
      justifyContent:'center',
      alignItems:'center'
     }
})