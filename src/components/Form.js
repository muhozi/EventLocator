import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/Styles';
import values from '../styles/Values';

export const Button = props => {
  const color = props.danger ? values.danger : values.primary;
  return (
    <TouchableHighlight
      underlayColor="rgba(255,255,255,0.2)"
      style={{ borderRadius: 5 }}
      {...props}
    >
      <View style={[styles.btn, { backgroundColor: color }]}>
        <Text style={{ color: '#fff' }}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  );
};
