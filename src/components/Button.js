import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';
import values from '../styles/Colors';

const Button = (props) => {
  const { danger, title } = props;
  const color = danger ? 'danger' : 'primary';
  return (
    <TouchableHighlight
      underlayColor="rgba(255,255,255,0.2)"
      style={{ borderRadius: 5 }}
      {...props}
    >
      <View style={[styles.btn, { backgroundColor: values[color] }]}>
        <Text style={{ color: '#fff' }}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

Button.defaultProps = {
  danger: false,
};

export default Button;
