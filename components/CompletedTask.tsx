import { Image } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CompletedTaskProps {
  title: string;
  description: string;
  completedDate: string;
  spentTime: string;
}

export const CompletedTask: React.FC<CompletedTaskProps> = ({
  title,
  description,
  completedDate,
  spentTime,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.leftContainer]}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.description]}>{description}</Text>
      </View>
      <View style={[styles.rightContainer]}>
        <View style={[styles.statusContainer]}>
          <View style={[styles.statusIcon]}>
            <Image source={require("@/assets/icons/tick.png")} style={{
            width:13,
            height:8,
            }}/>
          </View>
          <Text style={[styles.statusText]}>{completedDate}</Text>
        </View>
        <View style={[styles.spentTimeContainer]}>
          <Text style={[styles.spentTimeText]}>{spentTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 36,
    paddingVertical:12,
    backgroundColor: 'white',
    shadowColor: '#828FAF',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.07,
    shadowRadius: 30,
    elevation: 5,
  },
  leftContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    maxWidth:215,
  },
  rightContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8D99DE',
  },
  description: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#5B5B5B',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap:6,
  },
  statusIcon: {
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#13CE66',
  },
  spentTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 202, 101, 0.36)',
  },
  spentTimeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFCA65',
    textAlign: 'right',
  },
});

