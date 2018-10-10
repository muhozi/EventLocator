import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/Styles';
import values from '../styles/Colors';

const ErrorMessage = (props) => {
  const { danger, message } = props;
  const color = danger ? 'danger' : 'primary';
  return (
    <Text style={[styles.errorText, { color: values[color] }]}>
      &nbsp;&nbsp;&nbsp;
      {message}
    </Text>
  );
};

ErrorMessage.propTypes = {
  danger: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

ErrorMessage.defaultProps = {
  danger: false,
};

export default ErrorMessage;
