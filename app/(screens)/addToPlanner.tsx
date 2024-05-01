import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CheckboxGroup from '@/components/CheckBoxGroup';
import Checkbox from '@/components/CheckBox';
import Button from '../../elements/Button';
import { Modalize } from 'react-native-modalize';
import { router, useLocalSearchParams } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import Inputs from '@/components/Inputs';
import ShareSuccess from '@/components/ShareSuccess';
import BottomSheet from '@/components/BottomSheet';
import { useStore } from 'zustand';
import { useDataStore } from '../../store';
const recurrences: Recurrence[] = ['daily', 'weekly', 'monthly'];

const addToPlanner = () => {
  const [selectedTimeName, setSelectedTimeName] = useState('');

  const { scheduleItem, setScheduleItem } = useDataStore();

  const handleCheckboxChange = ({
    current,
    selected,
  }: {
    current: string;
    selected: string[];
  }) => {
    console.log('Selected label:', JSON.stringify(selected), current);
    setScheduleItem({
      ...scheduleItem,
      subject: current,
    });
  };

  const modalizeRef = useRef<Modalize>(null);
  const modalizeRefSuccess = useRef(null);
  const modalizeRefShare = useRef(null);

  const onOpenShare = () => {
    // @ts-ignore
    modalizeRefShare.current?.open();
  };

  const closeShare = () => {
    // @ts-ignore
    modalizeRefShare.current?.close();
  };

  const onOpenSuccess = () => {
    // @ts-ignore
    modalizeRefSuccess.current?.open();
  };
  const closeSuccess = () => {
    // @ts-ignore
    modalizeRefSuccess.current?.close();
  };
  const close = () => {
    // @ts-ignore
    onOpenSuccess();
    modalizeRef.current?.close();
  };
  const onOpen = () => {
    // @ts-ignore
    modalizeRef.current?.open();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require('../../assets/icons/back.png')}
            style={styles.backBtn}
          />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Add to Planner</Text>
      </View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <CheckboxGroup onChange={handleCheckboxChange}>
            {[
              'Computer Science',
              'Physiology',
              'Sociology',
              'Biology',
              'Physics',
              'Mathematics',
            ].map((label, index) => (
              <Checkbox
                isRadio={true}
                isChecked={false}
                onPress={(label, isRadio) => {
                  // Alert.alert(label);
                }}
                key={index}
                label={label}
              />
            ))}
          </CheckboxGroup>
        </View>
        <View style={styles.btn}>
          <Button disabled={false} text='Schedule' onPress={onOpen} />
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
        }}
      >
        <View style={styles.modalView}>
          <View style={[styles.header2, { marginTop: 20, marginLeft: 0 }]}>
            <TouchableOpacity onPress={() => close()}>
              <Image
                source={require('../../assets/icons/back.png')}
                style={styles.backBtn}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>Schedule a Class</Text>
          </View>
          <View style={styles.dropDownlistContainer}>
            <SelectDropdown
              data={recurrences}
              onSelect={(selectedItem, index) => {
                console.warn(selectedItem);
              }}
              renderDropdownIcon={() => (
                <Image
                  source={require('../../assets/icons/drop.png')}
                  resizeMode='contain'
                  style={{ width: 9, height: 14 }}
                />
              )}
              defaultButtonText={selectedTimeName || 'daily'}
              buttonTextAfterSelection={(selectedItem, index) => {
                // Return the specific property you want to display after selection
                setScheduleItem({
                  ...scheduleItem,
                  schedule: selectedItem,
                });
                setSelectedTimeName(selectedItem.TimeName);
                return selectedItem.TimeName;
              }}
              rowTextForSelection={(item, index) => {
                // Return the specific property you want to display for each item
                return item.TimeName;
              }}
              buttonStyle={styles.dropDownlist}
            />

            <TextInput
              placeholder='Type the note here...'
              style={styles.textArea}
              onChangeText={(text) => {
                setScheduleItem({
                  ...scheduleItem,
                  note: text,
                });
              }}
            />

            <View style={styles.containerDate}>
              <Inputs
                placeholder='Start Date'
                icon={require('../../assets/icons/calenderIcon.png')}
                isTime={false}
                onChangeText={(text) => {
                  Alert.alert(text);
                  // setScheduleItem({
                  //   ...scheduleItem,
                  //   startDate: text,
                  // });
                }}
              />
              <Inputs
                placeholder='End Date'
                icon={require('../../assets/icons/calenderIcon.png')}
                isTime={false}
                onChangeText={(text) => {
                  setScheduleItem({
                    ...scheduleItem,
                    endDate: text,
                  });
                }}
              />
            </View>
            <View style={styles.containerDate}>
              <Inputs
                placeholder='Start Time'
                icon={require('../../assets/icons/IconTime.png')}
                isTime={true}
                onChangeText={(text) => {
                  setScheduleItem({
                    ...scheduleItem,
                    startTime: text,
                  });
                }}
              />
              <Inputs
                placeholder='End Time'
                icon={require('../../assets/icons/IconTime.png')}
                isTime={true}
                onChangeText={(text) => {
                  setScheduleItem({
                    ...scheduleItem,
                    endTime: text,
                  });
                }}
              />
            </View>
          </View>

          <View style={styles.modalBtn}>
            <Button disabled={false} text='Finish' onPress={close} />
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
        }}
      >
        <View style={styles.modalView}>
          <ShareSuccess onClose={closeSuccess} share={onOpenShare} />
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
        }}
      >
        <View style={[styles.modalView]}>
          <BottomSheet onBack={closeShare} />
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default addToPlanner;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  headerTxt: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: '#8D99DE',
  },
  backBtn: {
    width: 20,
    height: 20,
  },
  mainContainer: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#FAFAFA',
    borderRadius: 100,
    marginTop: 20,
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
    alignItems: 'center',
  },
  textArea: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#9AA5B5',
    width: 308,
    height: 127,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: '500',
  },

  containerDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
