'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  NetInfo
} from 'react-native';
import MapView from 'react-native-maps';
import { Actions, Modal } from 'react-native-router-flux';
import Styles from './../styles/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
class Reserve extends React.Component {
  state = {
    isConnected: null,
    responseMsg: '',
    respoData: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    traffic: 0
  };
  componentWillMount() {}
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ isConnected });
    });
  }
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = isConnected => {
    this.setState({
      isConnected
    });
  };
  onLayout(e) {
    const {
      nativeEvent: {
        layout: { height }
      }
    } = e;
    this.height = height;
    this.forceUpdate();
  }
  validate() {
    if (
      this.state.firstname == '' ||
      this.state.lastname == '' ||
      this.state.email == '' ||
      this.state.phone == ''
    ) {
      this.setState({ responseMsg: 'Please fill all fields' });
      this.setState({ statusColor: 'red' });
      return false;
    } else if (
      /[^a-zA-Z ]/.test(this.state.firstname) ||
      this.state.firstname.length < 2
    ) {
      this.setState({ responseMsg: 'Please enter valid name (firsname)' });
      this.setState({ statusColor: 'red' });
      return false;
    } else if (
      /[^a-zA-Z ]/.test(this.state.lastname) ||
      this.state.lastname.length < 2
    ) {
      this.setState({ responseMsg: 'Please enter valid name (lastname)' });
      this.setState({ statusColor: 'red' });
      return false;
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.state.email
      )
    ) {
      this.setState({
        responseMsg: 'Please enter a valid email address',
        statusColor: 'red'
      });
      return false;
    } else if (this.state.phone.length < 10) {
      this.setState({
        responseMsg: 'Please enter a valid phone number \n (07XXXXXXXX)'
      });
      this.setState({ statusColor: 'red' });
      return false;
    } else if (
      /[^0-9]/.test(this.state.phone) ||
      this.state.phone.length !== 10
    ) {
      this.setState({
        responseMsg: 'Please enter a valid phone number \n (07XXXXXXXX)',
        statusColor: 'red'
      });
      return false;
    } else {
      this.setState({
        statusColor: 'green',
        responseMsg: 'Sending ...',
        traffic: 1
      });
      return true;
    }
  }
  //Send Rservation to Serve API
  sendReservation() {
    if (this.validate()) {
      if (this.state.isConnected) {
        fetch(
          'http://eventlocate.herokuapp.com/api/reserve/' + this.props.event_id,
          {
            //fetch('http://192.168.244.2/EventLocator/public/api/reserve/'+this.props.event_id, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              phone: this.state.phone
            })
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              responseMsg: responseData.message,
              statusColor: 'green',
              traffic: 0
            });
          })
          .catch(error => {
            this.setState({
              statusColor: 'rgba(255,0,0,1)',
              responseMsg: 'A problem occurs, Try again later.',
              traffic: 0
            });
          })
          .done();
      } else {
        this.setState({
          responseMsg: 'Check your internet network \n and try again',
          statusColor: 'red'
        });
      }
    }
  }
  //Render View
  render() {
    return (
      <View
        style={{
          flex: 12,
          flexDirection: 'column',
          backgroundColor: 'rgba(0,0,0,0)'
        }}
      >
        <StatusBar
          backgroundColor="rgba(25, 43, 62, 0.9)"
          barStyle="light-content"
        />
        <ScrollView>
          <View style={{ flex: 4, flexDirection: 'column' }}>
            <View
              style={[
                styles.formHeader,
                { alignItems: 'center', justifyContent: 'center' }
              ]}
            >
              <Text style={{ fontSize: 20, color: 'rgba(25, 43, 62, 0.9)' }}>
                Reserve
              </Text>
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
                  onChangeText={fname => {
                    this.setState({ firstname: fname });
                  }}
                  value={this.state.firstname}
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
                  onChangeText={lname => {
                    this.setState({ lastname: lname });
                  }}
                  value={this.state.lastname}
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
                  onChangeText={email => {
                    this.setState({ email: email });
                  }}
                  value={this.state.email}
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
                  onChangeText={phone => {
                    this.setState({ phone: phone });
                  }}
                  value={this.state.phone}
                  autoCorrect={false}
                />
              </View>
            </View>

            {this.state.traffic == 0 ? (
              <View
                style={[
                  styles.formRow,
                  { justifyContent: 'center', marginTop: 50 }
                ]}
              >
                <TouchableHighlight
                  underlayColor="rgba(255,255,255,0.2)"
                  style={{ borderRadius: 5 }}
                  onPress={() => {
                    this.sendReservation();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'rgba(25, 43, 62, 0.9)',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ color: '#fff' }}>Reserve</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor="rgba(255,255,255,0.2)"
                  style={{ borderRadius: 5, marginLeft: 20 }}
                  onPress={() => {
                    Actions.pop();
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'rgba(255, 50, 50, 1)',
                      paddingTop: 10,
                      paddingBottom: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderRadius: 5,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Text style={{ color: '#fff' }}>Cancel</Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : null}
            <View style={[styles.status]}>
              <Text
                style={[
                  {
                    flex: 1,
                    textAlign: 'center',
                    color: this.state.statusColor,
                    fontSize: 16
                  }
                ]}
              >
                &nbsp;&nbsp;&nbsp;
                {this.state.responseMsg}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
  viewEvent(id, lat, long) {
    Actions.event({ event_id: id, lat: lat, long: long });
  }
}
const styles = Styles;
export default Reserve;
