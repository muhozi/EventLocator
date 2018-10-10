import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Styles';

const DetailsCard = (props) => {
  const {
    details: {
      title, formatted_address: formattedAddress, date, host,
    },
  } = props;
  return (
    <View style={styles.detailsCard}>
      <Text style={styles.detailsCardTitle}>{title}</Text>
      <View style={styles.detailsCardBody}>
        <Text>
          <Icon name="ios-pin" size={16} />
          &nbsp;&nbsp;
          {formattedAddress}
        </Text>
        <Text>
          <Icon name="ios-calendar" />
          &nbsp;&nbsp;
          {date}
        </Text>
        <Text>
          <Icon name="ios-person" />
          &nbsp;&nbsp;
          {host}
        </Text>
      </View>
    </View>
  );
};

const detailsStructure = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  formatted_address: PropTypes.string,
  locality: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string,
  administrative_area_level_1: PropTypes.oneOf(PropTypes.string, PropTypes.null),
  lat: PropTypes.string,
  lng: PropTypes.string,
  host: PropTypes.string,
  user_id: PropTypes.number,
};

DetailsCard.propTypes = {
  details: PropTypes.shape(detailsStructure).isRequired,
};

export default DetailsCard;
