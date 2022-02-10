import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { RoundedButton } from './src/components/RoundedButton';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [FocusSubjectsStored, setFocusSubjectsStored] = useState([]);

  const clearSubject = () => {
    const newFSS = [...FocusSubjectsStored, focusSubject];
    setFocusSubjectsStored(newFSS);
    setFocusSubject(null);
  };
  return (
    <View style={styles.container}>
      {!focusSubject ? (
        <Focus
          addSubject={setFocusSubject}
          storedSubjects={FocusSubjectsStored}
        />
      ) : (
        <Timer
          clearSubject={clearSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
            clearSubject();
          }}
          Subject={focusSubject}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    color: colors.light,
  },
});
