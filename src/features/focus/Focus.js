import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, paddingSizes, marginSizes } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { borderRadiuses } from '../../utils/specials';

export const Focus = ({ addSubject, storedSubjects }) => {
  const [Subject, SetSubject] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Co jdeš dělat?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: marginSizes.md }}
            onChange={({ nativeEvent }) => {
              SetSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(Subject)}
          />
        </View>
    
      </View>
      <View style={styles.passedContainer}>
      <Text style = {styles.passedHeading}>Minulé činnosti</Text>
      {storedSubjects && storedSubjects.length > 0 
      ? storedSubjects.map((s) => (
        <Text style = {styles.passedText}>{s}</Text>
      )): <Text style = {styles.passedText}>Zatím nemáš žádné minulé činnosti</Text>
      }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  passedContainer : {
    flex:.5,
    backgroundColor: colors.light,
    borderRadius: borderRadiuses.md,
    padding: paddingSizes.md,
  },
passedHeading : {
  textAlign:"center",
  paddingVertical: paddingSizes.lg,
  fontSize: fontSizes.xl,
  fontWeight: "bold",

},
passedText : {
  fontSize: fontSizes.md,
  textAlign: "center",
},
  container: {
    flex: 1,
  },

  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },

  inputContainer: {
    flexDirection: 'row',
    flex: .3,
    alignItems: 'center',
  },

  title: {
    color: colors.light,
    fontWeight: 'bold',
    fontSize: fontSizes.xxl,
    marginBottom: marginSizes.xxl,
    textAlign: 'center',
  },
});
