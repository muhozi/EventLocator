import React from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  StatusBar,
  NetInfo,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../styles/Styles';
import Button from '../components/Form';

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

  componentWillMount() {}

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

  viewEvent = (id, lat, long) => Actions.event({ eventId: id, lat, long });

  validate() {
    const {
      firstname, lastname, email, phone,
    } = this.state;
    if (firstname === '' || lastname === '' || email === '' || phone === '') {
      this.setState({ responseMsg: 'Please fill all fields' });
      this.setState({ statusColor: 'red' });
      return false;
    }
    if (/[^a-zA-Z ]/.test(firstname) || firstname.length < 2) {
      this.setState({ responseMsg: 'Please enter valid name (firsname)' });
      this.setState({ statusColor: 'red' });
      return false;
    }
    if (/[^a-zA-Z ]/.test(lastname) || lastname.length < 2) {
      this.setState({ responseMsg: 'Please enter valid name (lastname)' });
      this.setState({ statusColor: 'red' });
      return false;
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email,
      )
    ) {
      this.setState({
        responseMsg: 'Please enter a valid email address',
        statusColor: 'red',
      });
      return false;
    }
    if (phone.length < 10) {
      this.setState({
        responseMsg: 'Please enter a valid phone number \n (07XXXXXXXX)',
      });
      this.setState({ statusColor: 'red' });
      return false;
    }
    if (/[^0-9]/.test(phone) || phone.length !== 10) {
      this.setState({
        responseMsg: 'Please enter a valid phone number \n (07XXXXXXXX)',
        statusColor: 'red',
      });
      return false;
    }
    this.setState({
      statusColor: 'green',
      responseMsg: 'Sending ...',
      traffic: 1,
    });
    return true;
  }

  sendReservation() {
    const {
      firstname, lastname, email, phone, isConnected,
    } = this.state;
    const { eventId } = this.props;
    if (this.validate()) {
      if (isConnected) {
        fetch(`http://eventlocate.herokuapp.com/api/reserve/${eventId}`, {
          // fetch('http://192.168.244.2/EventLocator/public/api/reserve/'+this.props.event_id, {
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
              statusColor: 'green',
              traffic: 0,
            });
          })
          .catch(() => {
            this.setState({
              statusColor: 'rgba(255,0,0,1)',
              responseMsg: 'A problem occurs, Try again later.',
              traffic: 0,
            });
          })
          .done();
      } else {
        this.setState({
          responseMsg: 'Check your internet network \n and try again',
          statusColor: 'red',
        });
      }
    }
  }

  render() {
    const styles = Styles;
    const {
      firstname, lastname, email, responseMsg, traffic, phone, statusColor,
    } = this.state;
    return (
      <View
        style={{
          flex: 12,
          flexDirection: 'column',
          backgroundColor: 'rgba(0,0,0,0)',
        }}
      >
        <StatusBar backgroundColor="rgba(25, 43, 62, 0.9)" barStyle="light-content" />
        <ScrollView>
          <View style={{ flex: 4, flexDirection: 'column' }}>
            <View style={[styles.formHeader, { alignItems: 'center', justifyContent: 'center' }]}>
              <Text style={{ fontSize: 20, color: 'rgba(25, 43, 62, 0.9)' }}>Reserve</Text>
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
                  placeholder="Firstname..."
                  underlineColorAndroid="rgba(25, 43, 62, 0.9)"
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
                  underlineColorAndroid="rgba(25, 43, 62, 0.9)"
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
                  underlineColorAndroid="rgba(25, 43, 62, 0.9)"
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
                  underlineColorAndroid="rgba(25, 43, 62, 0.9)"
                  onChangeText={(phoneText) => {
                    this.setState({ phone: phoneText });
                  }}
                  value={phone}
                  autoCorrect={false}
                />
              </View>
            </View>

            {traffic === 0 ? (
              <View style={[styles.formBlock, { justifyContent: 'center', marginTop: 50 }]}>
                <Button
                  title="Send"
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
            <View style={[styles.status]}>
              <Text
                style={[
                  {
                    flex: 1,
                    textAlign: 'center',
                    color: statusColor,
                    fontSize: 16,
                  },
                ]}
              >
                &nbsp;&nbsp;&nbsp;
                {responseMsg}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Reserve.propTypes = {
  eventId: PropTypes.number.isRequired,
};

export default Reserve;
