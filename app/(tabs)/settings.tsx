import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  ScrollView,
  TextInput,
  Switch

} from "react-native";
import SelectDropdown from "react-native-select-dropdown";


import { Link, useNavigation, useRouter } from "expo-router";




const settings: React.FC = () => {



  const router = useRouter();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        <View style={styles.mainsection}>
          <View style={styles.ProfileMain}>
            <Image style={styles.Profile} source={require('../../assets/images/Image.png')} />
            <View>
              <Text style={styles.heading}>Theodore Handle</Text>
              <Text style={[styles.heading, styles.headingSub]}>@username</Text>
            </View>



          </View>
          <TouchableOpacity onPress={() => router.push("/EditProfileUploads")}>
          <Image style={styles.ProfileEdit} source={require('../../assets/images/Icon.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.headingTimer}>Timer Settings</Text>

        <View style={styles.btnView}>
          <Text style={styles.headingTimerON}>Timer ON</Text>

          <Switch
            trackColor={{ false: '#rgba(139, 152, 221, 0.77)', true: '#rgba(139, 152, 221, 0.77)' }}
            thumbColor={isEnabled ? '#rgba(255, 255, 255, 1)' : '#rgba(255, 255, 255, 1)'}
            ios_backgroundColor="#rgba(255, 255, 255, 1)"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Text style={styles.headingTimer}>Your Account</Text>
        <TouchableOpacity style={styles.AccountView} onPress={() => router.push("/EditProfile")}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
            <Image style={styles.userIcon} source={require('../../assets/images/user.png')} />
            </View>
            <Text style={styles.headingEdit}>Edit profile</Text>
          </View>

          <Image style={styles.Arrow} source={require('../../assets/images/GroupArrow.png')} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
            <Image style={styles.userIcon} source={require('../../assets/images/profile_9483336.png')} />
            </View>
            <Text style={styles.headingEdit}>Manage account</Text>
          </View>

          <Image style={styles.Arrow} source={require('../../assets/images/GroupArrow.png')} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
            <Image style={styles.userIcon} source={require('../../assets/images/customer-service_174188 .png')} />
            </View>
            <Text style={styles.headingEdit}>Contact support</Text>
          </View>

          <Image style={styles.Arrow} source={require('../../assets/images/GroupArrow.png')} />

        </TouchableOpacity>
        <Text style={styles.headingTimer}>Community</Text>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
            <Image style={styles.userIcon} source={require('../../assets/images/FAQ.png')} />
            </View>
            <Text style={styles.headingEdit}>FAQ’s</Text>
          </View>

          <Image style={styles.Arrow} source={require('../../assets/images/GroupArrow.png')} />

        </TouchableOpacity>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
            <Image style={styles.userIcon} source={require('../../assets/images/logout.png')} />
            </View>
            <Text style={styles.headingEdit}>Logout</Text>
          </View>

          <Image style={styles.Arrow} source={require('../../assets/images/GroupArrow.png')} />

        </TouchableOpacity>







      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  mainsection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  ProfileMain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  Profile: {
    width: 90,
    height: 90,
    borderRadius: 100
  },
  ProfileEdit: {
    width: 14,
    height: 14
  },
  heading: {
    color: "rgba(30, 32, 34, 1)",
    fontWeight: "500",
    lineHeight: 24.2,
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 29

  },
  headingTimer: {
    color: "rgba(53, 53, 53, 1)",
    fontWeight: "700",
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    letterSpacing: 1,
    marginTop: 40
  },
  AccountView: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems:'center'
  },
  IconView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
    marginTop:20
  },
  BoxView:{
   backgroundColor:'white',
   width:34,
   height:34,
   alignItems:'center',
   justifyContent:'center',
   borderRadius:100,
   shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 1.84,

elevation: 5,

  },
  userIcon:{
   width:14,
   height:14,
   
  },


  headingTimerON: {
    color: "rgba(53, 53, 53, 0.61)",
    fontWeight: "500",
    lineHeight: 16.94,
    fontSize: 14,
  },
  headingEdit:{
    color: "rgba(53, 53, 53, 0.61)",
    fontWeight: "500",
    lineHeight: 16.94,
    fontSize: 16
  },
  headingSub: {
    color: "rgba(119, 131, 143, 1)",
    fontSize: 14,
    lineHeight: 19.36,
    letterSpacing: 1,
  },
  Arrow:{
    width:13,
    height:12
  }




});

export default settings;
