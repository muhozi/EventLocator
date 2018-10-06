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
import styles from './../styles/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import values from '../styles/Values';
import { Button } from '../components/Form';

class Comment extends React.Component {
  state = {
    isConnected: null,
    responseMsg: '',
    respoData: '',
    firstname: '',
    lastname: '',
    email: '',
    comment: '',
    statusColor: 'green',
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
      'change',
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
  //Validate
  validate() {
    if (
      this.state.firstname == '' ||
      this.state.lastname == '' ||
      this.state.email == '' ||
      this.state.comment == ''
    ) {
      this.setState({
        responseMsg: 'Please fill all fields',
        statusColor: 'red'
      });
      return false;
    } else if (
      /[^a-zA-Z ]/.test(this.state.firstname) ||
      this.state.firstname.length < 2
    ) {
      this.setState({
        responseMsg: 'Please enter valid name (firsname)',
        statusColor: 'red'
      });
      return false;
    } else if (
      /[^a-zA-Z ]/.test(this.state.lastname) ||
      this.state.lastname.length < 2
    ) {
      this.setState({
        responseMsg: 'Please enter valid name (lastname)',
        statusColor: 'red'
      });
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
    } else if (this.state.comment.length < 10) {
      this.setState({
        responseMsg: 'Please enter a valid comment \n at least 10 characters',
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
  sendComment() {
    if (this.validate()) {
      if (this.state.isConnected) {
        fetch(
          'https://eventlocate.herokuapp.com/api/comment/' +
            this.props.event_id,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              email: this.state.email,
              comment: this.state.comment
            })
          }
        )
          .then(response => response.json())
          .then(responseData => {
            this.setState({
              firstname: '',
              lastname: '',
              email: '',
              comment: '',
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
          responseMsg: 'Check your internet network \n and try again'
        });
        this.setState({ statusColor: 'red' });
      }
    }
  }
  //Render View
  render() {
    const { statusColor, responseMsg } = this.state;
    return (
      <View style={styles.page}>
        <StatusBar
          backgroundColor="rgba(25, 43, 62, 0.9)"
          barStyle="light-content"
        />
        <ScrollView>
          <View style={{ flex: 4, flexDirection: 'column' }}>
            <View style={styles.formBlock}>
              <Text style={styles.header}>
                Comment on the event
              </Text>
            </View>
            <View style={styles.formRow}>
              <View style={styles.formLabel}>
                <Text style={styles.labelText}>
                  <Icon name="md-person" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <TextInput
                  style={styles.formInputText}
                  placeholder="Firstname..."
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
                  onChangeText={value => {
                    this.setState({ email: value });
                  }}
                  value={this.state.email}
                  autoCorrect={false}
                />
              </View>
            </View>
            <View style={[styles.formRow]}>
              <View style={styles.formLabelDescription}>
                <Text style={styles.labelText}>
                  <Icon name="md-chatboxes" size={20} />
                </Text>
              </View>
              <View style={styles.formInput}>
                <View style={styles.descriptionContainer}>
                  <TextInput
                    style={styles.description}
                    placeholder="Enter your comment..."
                    onChangeText={value => {
                      this.setState({ comment: value });
                    }}
                    value={this.state.comment}
                    autoCorrect={false}
                    multiline={true}
                    numberOfLines={8}
                  />
                </View>
              </View>
            </View>
            {this.state.traffic == 0 ? (
              <View
                style={[
                  styles.formBlock,
                  { justifyContent: 'center', marginTop: 50 }
                ]}
              >
                <Button title="Send" onPress={() => this.sendComment()} />
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
                    fontSize: 16
                  }
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
  viewEvent(id, lat, long) {
    Actions.event({ event_id: id, lat: lat, long: long });
  }
}
export default Comment;