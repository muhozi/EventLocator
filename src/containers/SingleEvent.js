import React from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import styles from '../styles/Styles';
import Button from '../components/Button';
import DetailsCard from '../components/EventDetailsCard';

const ActionsButtons = (props) => {
  const {
    eventDetails: { id: eventId },
    eventDetails,
  } = props;
  return (
    <View style={styles.actionsButtonsContainer}>
      <View style={styles.actionButtonContainer}>
        <Button
          title="Reserve"
          onPress={() => (eventId ? Actions.reserve({ eventDetails }) : null)}
        />
      </View>
      <View style={styles.actionButtonContainer}>
        <Button
          title="Comment"
          onPress={() => (eventId ? Actions.comment({ eventDetails }) : null)}
        />
      </View>
    </View>
  );
};

class SingleEvent extends React.Component {
  onLayout(e) {
    const {
      nativeEvent: {
        layout: { height },
      },
    } = e;
    this.height = height;
    this.forceUpdate();
  }

  render() {
    const {
      eventDetails: { lat, lng, formatted_address: formattedAddress },
      eventDetails,
    } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="rgba(25, 43, 62, 0.9)"
          barStyle="light-content"
          StatusBarAnimation="slide"
        />
        <ActionsButtons eventDetails={eventDetails} />
        <View
          style={{
            position: 'absolute',
            bottom: 50,
            zIndex: 2000,
            left: 0,
            right: 0,
          }}
        >
          <DetailsCard details={eventDetails} />
        </View>
        {lat && lng ? (
          <MapView.Animated
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(lat),
              longitude: parseFloat(lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                longitude: parseFloat(lng),
                latitude: parseFloat(lat),
              }}
              title="Location"
              description={formattedAddress}
            >
              <View style={styles.mapMarker}>
                <View style={styles.mapMarkerPoint} />
              </View>
            </MapView.Marker>
          </MapView.Animated>
        ) : null}
      </View>
    );
  }
}

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

SingleEvent.propTypes = {
  eventDetails: PropTypes.shape(detailsStructure).isRequired,
};

ActionsButtons.propTypes = {
  eventDetails: PropTypes.shape(detailsStructure).isRequired,
};

export default SingleEvent;
