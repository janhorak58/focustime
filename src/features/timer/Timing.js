import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { borderRadiuses } from '../../utils/specials';


export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.timingButton}>
        <RoundedButton style={styles.button} onPress={() => onChangeTime(-1)} title={'-1'} size={60} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton style={styles.button} onPress={() => onChangeTime(-5)} title={'-5'} size={70} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton style={styles.button} onPress={() => onChangeTime(5)} title={'5'} size={70} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton style={styles.button} onPress={() => onChangeTime(1)} title={'1'} size={60} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    width:300,
  },
  timingButton: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 2,
  },

  button : {
    backgroundColor: colors.light,
    borderColor: colors.dark,
    borderRadius: borderRadiuses.lg,
  }
});
