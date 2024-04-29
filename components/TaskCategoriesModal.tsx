import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import TaskCategories from './TaskCategories'
import { Modalize } from 'react-native-modalize';


const TaskCategoriesModal = ({visible,onClose}) => {
  return (

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
      

    <TaskCategories onClose={onClose} />

    </View>


  </Modalize>
  )
}


const styles = StyleSheet.create({
  modalView: {

    paddingHorizontal: 34,
    paddingVertical: 34,
    marginTop: 5,
    width: '100%',


  },
})

export default TaskCategoriesModal