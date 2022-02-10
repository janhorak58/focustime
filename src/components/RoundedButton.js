import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 12,
  ...props
}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      borderColor: colors.success,
      backgroundColor: colors.success,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: colors.dark,
      fontWeight: "bold",
      fontSize: size / 2,
      textAlign: "center",
      marginVertical: "auto",
    },
  });
