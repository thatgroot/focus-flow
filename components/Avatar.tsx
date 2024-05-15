import { TouchableOpacity, View } from 'react-native';
import { createAvatar } from '@dicebear/core';
import { funEmoji, lorelei } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';
import { auth } from '@/utils/firebase';
import { router } from 'expo-router';

export  function Avatar() {
  const avatar = createAvatar(funEmoji, {
    seed: auth.currentUser?.displayName ?? "Kitty",
    backgroundColor: ["b6e3f4","c0aede","d1d4f9"]
  }).toString();

  return (
    <TouchableOpacity
    onPress={()=>{
      router.push("/settings");
    }}
     style={{
      width:44,
      height:44,
      borderRadius:6,
      overflow:"hidden"
    }}>
      <SvgXml xml={avatar} />
    </TouchableOpacity>
  );
}
