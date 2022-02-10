import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from './RoundedButton';
import { fontSizes, paddingSizes, marginSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import { borderRadiuses } from '../utils/specials';

const minutesToMillis = (minutes) => minutes * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 5, isPaused = true, onProgress, onEnd }) => {
  const [Millis, setMillis] = useState(minutesToMillis(minutes));

  const minute = Math.floor(Millis / 1000 / 60) % 60;
  const second = Math.floor(Millis / 1000) % 60;
  const interval = React.useRef(null);
  const doCountDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        onEnd()
        return time;
        
      } else {
        const timeLeft = time - 1000;
        onProgress(timeLeft/minutesToMillis(minutes))
        return timeLeft;
      }
    });
  };
 
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    } 

      interval.current = setInterval(doCountDown, 1000);
    
    return () => clearInterval(interval.current); 
  }, [isPaused]);

 useEffect(() => {
    
    setMillis(minutesToMillis(minutes))

  }, [minutes])
 
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 120,
    backgroundColor: colors.success,
    borderRadius: borderRadiuses.xl,
    paddingHorizontal: paddingSizes.xxl,
    paddingVertical: paddingSizes.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: fontSizes.xxl * 1.3,
    justifyContent: 'center',
    alignItems: 'center',

    fontWeight: 'bold',
    color: colors.dark,
  },
});
