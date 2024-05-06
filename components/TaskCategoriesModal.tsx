import { View, Text,StyleSheet,TouchableOpacity,Image,TextInput } from 'react-native'
import React,{useRef,useState} from 'react'
import TaskCategories from './TaskCategories'
import { Modalize } from 'react-native-modalize';
import SelectDropdown from "react-native-select-dropdown";
import Inputs from '@/components/Inputs';
import Button from '@/elements/Button';
import BottomSheet from '@/components/BottomSheet';
import ShareSuccess from '@/components/ShareSuccess';





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


const TaskCategoriesModal = ({ref: visible,onClose}:{
  ref: any;
  onClose:any
}) => {


  const [selectedTimeName, setSelectedTimeName] = useState('');


  const modalizeReff = useRef<Modalize>(null);
  const modalizeRefSuccessRff = useRef<Modalize>(null);
  const modalizeRefShareRFF = useRef<Modalize>(null);

  const onCloseRFF = () => {
    // @ts-ignore
    onOpenSuccess()
    modalizeReff.current?.close();
  }
  const onOpen = () => {
    // @ts-ignore
    modalizeReff.current?.open();
  };


  const onOpenShare = () => {
    // @ts-ignore
    modalizeRefShareRFF.current?.open();
  };

  const closeShare = () => {
    // @ts-ignore
    modalizeRefShareRFF.current?.close();
  }

  const onOpenSuccess = () => {
    // @ts-ignore
    modalizeRefSuccessRff.current?.open();
  };
  const closeSuccess = () => {
    // @ts-ignore
    modalizeRefSuccessRff.current?.close();
  }

  return (
   <>
    <Modalize
    modalHeight={570}
    ref={visible}
    handleStyle={{
      marginTop: 30,
      backgroundColor: '#e9e9e9',
      width: 80,
      zIndex: 9999,
      elevation: 9999,

    }}>


    <View style={[styles.modalView]}>


    <TaskCategories onClose={onClose} onOpen={onOpen} />

    </View>


  </Modalize>

  <Modalize
        modalHeight={570}
        ref={modalizeReff}
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
          zIndex: 9999,
          elevation: 9999,

        }}>


        <View style={styles.modalView}>
          <View style={[styles.header2, { marginTop: 20, marginLeft: 0 }]}>
            <TouchableOpacity onPress={() => onCloseRFF()}>
              <Image source={require('../assets/icons/back.png')} style={styles.backBtn} />

            </TouchableOpacity>
            <Text style={styles.headerTxt}>Schedule a Class</Text>

          </View>
          <View style={styles.dropDownlistContainer}>
            <SelectDropdown
              data={TimeList}
              onSelect={(selectedItem, index) => {
                console.warn(selectedItem);
              }}
              renderDropdownIcon={() => <Image source={require('../assets/icons/drop.png')} resizeMode='contain' style={{ width: 9, height: 14 }} />}
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

              <Inputs placeholder='Start Date' icon={require('../assets/icons/calenderIcon.png')} isTime={false}  />
              <Inputs placeholder='End Date' icon={require('../assets/icons/calenderIcon.png')} isTime={false}  />

            </View>
            <View style={styles.containerDate}>

             <Inputs placeholder='Start Time' icon={require('../assets/icons/IconTime.png')} isTime={true} />
             <Inputs placeholder='End Time' icon={require('../assets/icons/IconTime.png')} isTime={true} />

           </View>
          </View>

         <View style={styles.modalBtn}>
         <Button disabled={false} text='Finish' onPress={onCloseRFF} />

         </View>
        </View>


      </Modalize>

      <Modalize
        modalHeight={570}
        ref={modalizeRefShareRFF}
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
      <Modalize
        modalHeight={570}
        ref={modalizeRefSuccessRff}
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
          zIndex: 9999,
          elevation: 9999,

        }}>


        <View style={styles.modalView}>


         <ShareSuccess onClose={closeSuccess} share={onOpenShare} />
        </View>


      </Modalize>
  </>
  )
}


const styles = StyleSheet.create({
  modalView: {

    paddingHorizontal: 34,
    paddingVertical: 34,
    marginTop: 5,
    width: '100%',


  },
  backBtn: {
    width: 20,
    height: 20
  },
  headerTxt: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: '#8D99DE'
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
    fontFamily: "Inter-Regular",
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

export default TaskCategoriesModal
