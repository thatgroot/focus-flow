import { auth } from '@/utils/firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet } from 'react-native';

export function Avatar(): JSX.Element {
 const name = auth.currentUser?.displayName ?? "A Z";
 const initials = name.split(' ').map((word) => word[0].toUpperCase()).join('');
 const colors = ['#f00', '#ff0', '#0f0', '#00f', '#f0f', '#0ff'];

 return (
  <LinearGradient
   colors={colors}
   start={[0, 0]}
   end={[1, 0]}
   style={styles.avatarContainer}
  >
   <Text style={[styles.avatarText]}>
    {initials}
   </Text>
  </LinearGradient>
 );
}

const styles = StyleSheet.create({
 avatarContainer: {
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
 },
 avatarText: {
  color: '#fff',
  fontSize: 20,
  fontWeight: 'bold',
 },
});

