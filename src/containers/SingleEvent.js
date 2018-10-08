import React from 'react';
import {
  Text, View, TouchableHighlight, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../styles/Styles';

class SingleEvent extends React.Component {
  state = {
    eventData: '',
  };

  componentWillMount() {}

  componentDidMount() {
    const { eventId } = this.props;
    fetch(`https://eventlocate.herokuapp.com/api/events/${eventId}`, { method: 'GET' })
      .then(response => response.json())
      .then((responseData) => {
        this.setState({ eventData: responseData });
      })
      .catch(() => {
        alert('Something went wrong!');
      })
      .done();
  }

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
    const { eventData } = this.state;
    const styles = Styles;
    return (
      <View style={{ flex: 1, paddingTop: 0, flexDirection: 'row' }}>
        <StatusBar
          backgroundColor="rgba(25, 43, 62, 0.9)"
          barStyle="light-content"
          StatusBarAnimation="slide"
        />
        <View
          style={{
            backgroundColor: 'rgba(25, 43, 62, 0.9)',
            flex: 1,
            flexDirection: 'row',
            height: 53,
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 10 }}>
            <TouchableHighlight
              underlayColor="rgba(0,0,0,0)"
              onPress={() => {
                Actions.pop();
              }}
            >
              <View>
                <Text style={{ color: '#ffffff' }}>
                  <Icon name="md-arrow-back" size={24} />
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={{ flex: 9, justifyContent: 'center', flexDirection: 'row' }}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <TouchableHighlight
                underlayColor="rgba(255,255,255,0.3)"
                onPress={() => (
                  eventData.id ? Actions.reserve({ eventId: eventData.id }) : null
                )}
                style={{ borderRadius: 5 }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    borderWidth: 0,
                    borderRadius: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Reserve
                </Text>
              </TouchableHighlight>
            </View>

            <View
              style={{
                flex: 5,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 10,
              }}
            >
              <TouchableHighlight
                underlayColor="rgba(255,255,255,0.3)"
                onPress={() => (
                  eventData.id ? Actions.comment({ eventId: eventData.id }) : null
                )}
                style={{ borderRadius: 5 }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    borderWidth: 0,
                    borderRadius: 5,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}
                >
                  Comment
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
        {eventData.lat ? (
          <MapView.Animated
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(eventData.lat),
              longitude: parseFloat(eventData.lng),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapView.Marker
              coordinate={{
                longitude: parseFloat(eventData.lng),
                latitude: parseFloat(eventData.lat),
              }}
              title="Location"
              description={eventData.formatted_address}
            >
              <View
                style={{
                  backgroundColor: 'rgba(25, 43, 62, 0.4)',
                  height: 50,
                  width: 50,
                  borderRadius: 50 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(25, 43, 62, 0.9)',
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    backgroundColor: 'rgba(25, 43, 62, 0.9)',
                    height: 20,
                    width: 20,
                    borderRadius: 20 / 2,
                    borderWidth: 1,
                    borderColor: '#fff',
                  }}
                />
              </View>
            </MapView.Marker>
          </MapView.Animated>
        ) : null}
      </View>
    );
  }
}

SingleEvent.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default SingleEvent;
