import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { fontSizes, paddingSizes, marginSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { borderRadiuses } from '../../utils/specials';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { useKeepAwake } from 'expo-keep-awake';
import { Timing } from './Timing';

export const Timer = ({ Subject, onTimerEnd, clearSubject }) => {
  useKeepAwake()
  const DEFAULT_TIME = 20;


  const [IsStarted, setIsStarted] = useState(false);
  const [Progress, setProgress] = useState(1);
  const [Minutes, setMinutes] = useState(DEFAULT_TIME);

  const onEnd = () => {
    vibrate()
    setIsStarted(false)
    setMinutes(DEFAULT_TIME)
    setProgress(1)
    onTimerEnd()

  }

  const vibrate = () => {
    if (Platform.os == "ios") {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(()=>clearInterval(interval), 3000); 
    } else {
      Vibration.vibrate(3000);
    }
  }

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const changeTime = (min) => {
    if (Minutes + min > 0 && !IsStarted) {
      setMinutes(Minutes + min);

    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={Minutes}
          isPaused={!IsStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <ProgressBar
        color={colors.success}
        progress={Progress}
        style={{ height: 15, borderTopLeftRadius: borderRadiuses.lg, borderTopRightRadius: borderRadiuses.lg }}
      />
      <Text style={styles.task}>{Subject}</Text>
      <ProgressBar
        color={colors.success}
        progress={Progress}
        style={{ height: 15, borderRadius: borderRadiuses.sm, borderBottomLeftRadius: borderRadiuses.lg, borderBottomRightRadius: borderRadiuses.lg}}
      />
      <View style={styles.buttonContainer}>
        {!IsStarted && <View style={styles.buttonContainer}>
          <Timing onChangeTime={changeTime}  />
        </View>}
        <RoundedButton
          title={IsStarted ? 'PAUZA' : 'START'}
          textStyle={{ fontSize: fontSizes.lg, }}
          size={150}
          onPress={() => setIsStarted(!IsStarted)}
        />
      </View>

       <View style={styles.clearSubject}>
        {!IsStarted && <RoundedButton
          title={'ZRUŠIT'}
          textStyle={{ fontSize: fontSizes.md }}
          style={{backgroundColor:colors.warning, borderColor:colors.warning, borderRadius: borderRadiuses.md, width:200, }}
          size={60}
          onPress={() => clearSubject()}
        />}
        
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 'auto',
    marginVertical: 20,
  },

  clearSubject : {
    justifyContent:"center", 
    alignItems:"center",
  },

  container: {
    flex: 1,
    backgroundColor: colors.dark,
    padding: paddingSizes.xl,
    borderRadius: borderRadiuses.md,
    fontSize: fontSizes.lg,
  },

  task: {
    backgroundColor: colors.light,
    color: colors.dark,
    fontSize: fontSizes.xxl,
    justifyContent: 'center',
    fontWeight: 'bold',

    textAlign: 'center',
    padding: paddingSizes.sm,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
