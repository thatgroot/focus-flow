import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import CheckboxGroup from '@/components/CheckBoxGroup'
import Checkbox from '@/components/CheckBox'
import Button from '../../elements/Button';
import { Modalize } from 'react-native-modalize';
import { router } from 'expo-router';
import SelectDropdown from "react-native-select-dropdown";
import Inputs from '@/components/Inputs';
import ShareSuccess from '@/components/ShareSuccess';
import BottomSheet from '@/components/BottomSheet';


const TimeList = [
  {
    id: 1,
    TimeName: 'daily'
  },
  {
    id: 2,
    TimeName: 'once a month'
  },
  {
    id: 3,
    TimeName: 'weekly'
  },

];


const addToPlanner = () => {


  const [selectedTimeName, setSelectedTimeName] = useState('');

  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log("Selected label:", JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };

  const modalizeRef = useRef(null);
  const modalizeRefSuccess = useRef(null);
  const modalizeRefShare = useRef(null);


  const onOpenShare = () => {
    // @ts-ignore
    modalizeRefShare.current?.open();
  };
 
  const closeShare = () => {
    // @ts-ignore
    modalizeRefShare.current?.close();
  }
 
  const onOpenSuccess = () => {
    // @ts-ignore
    modalizeRefSuccess.current?.open();
  };
  const closeSuccess = () => {
    // @ts-ignore
    modalizeRefSuccess.current?.close();
  }
  const close = () => {
    // @ts-ignore
    onOpenSuccess()
    modalizeRef.current?.close();
  }
  const onOpen = () => {
    // @ts-ignore
    modalizeRef.current?.open();
  };

  

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()  }>
        <Image source={require('../../assets/icons/back.png')} style={styles.backBtn} />
  
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Add to Planner</Text>

      </View>
      <ScrollView>


        <View style={styles.mainContainer}>
          <CheckboxGroup onChange={handleCheckboxChange}>
            {["Pscychology", "Physiology", "Physiologys", "Biology", "Physics", "Mathematics"].map(
              (label, index) => (
                <Checkbox
                  isRadio={false}
                  isChecked={false}
                  onPress={() => { }}
                  key={index}
                  label={label}
                />
              )
            )}
          </CheckboxGroup>
        </View>
        <View style={styles.btn}>
          <Button text='Schedule' onPress={onOpen} />

        </View>
      </ScrollView>
      <Modalize
        modalHeight={570}
        ref={modalizeRef}
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
          zIndex: 9999,
          elevation: 9999,

        }}>


        <View style={styles.modalView}>
          <View style={[styles.header2, { marginTop: 20, marginLeft: 0 }]}>
            <TouchableOpacity onPress={() => close()}>
              <Image source={require('../../assets/icons/back.png')} style={styles.backBtn} />

            </TouchableOpacity>
            <Text style={styles.headerTxt}>Schedule a Class</Text>

          </View>
          <View style={styles.dropDownlistContainer}>
            <SelectDropdown
              data={TimeList}
              onSelect={(selectedItem, index) => {
                console.warn(selectedItem);
              }}
              renderDropdownIcon={() => <Image source={require('../../assets/icons/drop.png')} resizeMode='contain' style={{ width: 9, height: 14 }} />}
              defaultButtonText={selectedTimeName || 'daily'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // Return the specific property you want to display after selection
                setSelectedTimeName(selectedItem.TimeName)
                return selectedItem.TimeName;
              }}

              rowTextForSelection={(item, index) => {
                // Return the specific property you want to display for each item
                return item.TimeName;
              }}

              buttonStyle={styles.dropDownlist}
            />

            <TextInput placeholder='Type the note here...' style={styles.textArea} />

            <View style={styles.containerDate}>
             
              <Inputs txt='Start Date' icon={require('../../assets/icons/calenderIcon.png')} isTime={false}  />
              <Inputs txt='End Date' icon={require('../../assets/icons/calenderIcon.png')} isTime={false}  />

            </View>
            <View style={styles.containerDate}>
             
             <Inputs txt='Start Time' icon={require('../../assets/icons/IconTime.png')} isTime={true} />
             <Inputs txt='End Time' icon={require('../../assets/icons/IconTime.png')} isTime={true} />

           </View>
          </View>

         <View style={styles.modalBtn}>
         <Button text='Finish' onPress={close} />

         </View>
        </View>


      </Modalize>
      <Modalize
        modalHeight={570}
        ref={modalizeRefSuccess}
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
          zIndex: 9999,
          elevation: 9999,

        }}>


        <View style={styles.modalView}>
          

         <ShareSuccess onclose={closeSuccess} share={onOpenShare} />
        </View>


      </Modalize>
      <Modalize
        modalHeight={570}
        ref={modalizeRefShare}
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
          zIndex: 9999,
          elevation: 9999,

        }}>


        <View style={[styles.modalView]}>
          

         <BottomSheet onBack={closeShare} />
        </View>


      </Modalize>


    </SafeAreaView>
  )
}

export default addToPlanner

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: 'center',
    marginLeft: 20
  },
  headerTxt: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: '#8D99DE'
  },
  backBtn: {
    width: 20,
    height: 20
  },
  mainContainer: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: 30


  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {

    paddingHorizontal: 34,
    paddingVertical: 34,
    marginTop: 5,
    width: '100%',


  },
  dropDownlist: {
    borderWidth: 1,
    borderColor: 'rgba(154, 165, 181, 1)',
    width: 308,
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 100,
    marginTop: 20

  },
  header2: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: 'center',

  },
  dropDownlistContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textArea: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'regular',
    borderWidth: 1,
    borderColor: '#9AA5B5',
    width: 308,
    height: 127,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: '500'
  },
  
  containerDate:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%'
  },
  modalBtn:{
    width:'100%',
    justifyContent:"center",
    alignItems:"center"
  }

})
