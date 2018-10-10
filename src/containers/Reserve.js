import React from 'react';
import {
  Text, View, TextInput, ScrollView, StatusBar, NetInfo,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../styles/Styles';
import Button from '../components/Button';
import DetailsCard from '../components/EventDetailsCard';
import ErrorMessage from '../components/ErrorMessage';
import apiUrl from '../utils';

class Reserve extends React.Component {
  state = {
    isConnected: null,
    responseMsg: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    traffic: 0,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ isConnected });
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
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

  handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };

  validate() {
    const {
      firstname, lastname, email, phone,
    } = this.state;
    if (firstname === '' || lastname === '' || email === '' || phone === '') {
      this.setState({ responseMsg: 'Please fill all fields' });
      this.setState({ error: true });
      return false;
    }
    if (/[^a-zA-Z ]/.test(firstname) || firstname.length < 2) {
      this.setState({ responseMsg: 'Please enter valid name (firsname)' });
      this.setState({ error: true });
      return false;
    }
    if (/[^a-zA-Z ]/.test(lastname) || lastname.length < 2) {
      this.setState({ responseMsg: 'Please enter valid name (lastname)' });
      this.setState({ error: true });
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      this.setState({
        responseMsg: 'Please enter a valid email address',
        error: true,
      });
      return false;
    }
    if (/[^0-9]/.test(phone) || phone.length <= 10 || phone.length > 12) {
      this.setState({
        responseMsg:
          'Please enter a valid phone number\n (Integers and length of 10 to 12)',
        error: true,
      });
      return false;
    }
    this.setState({
      error: false,
      responseMsg: 'Sending ...',
      traffic: 1,
    });
    return true;
  }

  sendReservation() {
    const {
      firstname, lastname, email, phone, isConnected,
    } = this.state;
    const {
      eventDetails: { id: eventId },
    } = this.props;
    if (this.validate()) {
      if (isConnected) {
        fetch(`${apiUrl}/reserve/${eventId}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
          }),
        })
          .then(response => response.json())
          .then((responseData) => {
            this.setState({
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              responseMsg: responseData.message,
              error: false,
              traffic: 0,
            });
          })
          .catch(() => {
            this.setState({
              error: true,
              responseMsg: 'A problem occurs, Try again later.',
              traffic: 0,
            });
          })
          .done();
      } else {
        this.setState({
          responseMsg: 'Check your internet network \n and try again',
          error: true,
        });
      }
    }
  }

  render() {
    const styles = Styles;
    const {
      firstname, lastname, email, responseMsg, traffic, phone, error,
    } = this.state;
    const { eventDetails } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(25, 43, 62, 0.9)" />
        <ScrollView>
          <View style={styles.formContainer}>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}>
                  <Icon name="md-person" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Firstname..."
                  onChangeText={(fname) => {
                    this.setState({ firstname: fname });
                  }}
                  value={firstname}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}>
                  <Icon name="md-person" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Lastname..."
                  onChangeText={(lname) => {
                    this.setState({ lastname: lname });
                  }}
                  value={lastname}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}>
                  <Icon name="md-mail" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Email..."
                  onChangeText={emailText => this.setState({ email: emailText })}
                  value={email}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}>
                  <Icon name="md-call" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Phone number..."
                  onChangeText={(phoneText) => {
                    this.setState({ phone: phoneText });
                  }}
                  value={phone}
                  autoCorrect={false}
                />
              </View>
            </View>

            {traffic === 0 ? (
              <View style={styles.formBlock}>
                <Button
                  title="Reserve"
                  onPress={() => {
                    this.sendReservation();
                  }}
                />
                <Button
                  title="Cancel"
                  onPress={() => {
                    Actions.pop();
                  }}
                  danger
                />
              </View>
            ) : null}
            <View style={styles.status}>
              <ErrorMessage message={responseMsg} danger={error} />
            </View>
            <DetailsCard details={eventDetails} />
          </View>
        </ScrollView>
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

Reserve.propTypes = {
  eventDetails: PropTypes.shape(detailsStructure).isRequired,
};

export default Reserve;
