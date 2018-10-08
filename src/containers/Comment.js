import React from 'react';
import {
  Text, View, TextInput, ScrollView, StatusBar, NetInfo,
} from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/Styles';
import Button from '../components/Form';

class Comment extends React.Component {
  state = {
    isConnected: null,
    responseMsg: '',
    firstname: '',
    lastname: '',
    email: '',
    comment: '',
    statusColor: 'green',
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
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
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
      firstname, lastname, email, comment,
    } = this.state;
    if (firstname === '' || lastname === '' || email === '' || comment === '') {
      this.setState({
        responseMsg: 'Please fill all fields',
        statusColor: 'red',
      });
      return false;
    }
    if (/[^a-zA-Z ]/.test(firstname) || firstname.length < 2) {
      this.setState({
        responseMsg: 'Please enter valid name (firsname)',
        statusColor: 'red',
      });
      return false;
    }
    if (/[^a-zA-Z ]/.test(lastname) || lastname.length < 2) {
      this.setState({
        responseMsg: 'Please enter valid name (lastname)',
        statusColor: 'red',
      });
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
    if (comment.length < 10) {
      this.setState({
        responseMsg: 'Please enter a valid comment \n at least 10 characters',
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

  sendComment() {
    const {
      firstname, lastname, email, comment, isConnected,
    } = this.state;
    const { eventId } = this.props;
    if (this.validate()) {
      if (isConnected) {
        fetch(`https://eventlocate.herokuapp.com/api/comment/${eventId}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            comment,
          }),
        })
          .then(response => response.json())
          .then((responseData) => {
            this.setState({
              firstname: '',
              lastname: '',
              email: '',
              comment: '',
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
        });
        this.setState({ statusColor: 'red' });
      }
    }
  }

  render() {
    const {
      statusColor, responseMsg, firstname, lastname, email, comment, traffic,
    } = this.state;
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor="rgba(25, 43, 62, 0.9)" barStyle="light-content" />
        <ScrollView>
          <View style={{ flex: 4, flexDirection: 'column' }}>
            <View style={styles.formBlock}>
              <Text style={styles.header}>Comment on the event</Text>
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
                  onChangeText={(value) => {
                    this.setState({ email: value });
                  }}
                  value={email}
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
                    onChangeText={(value) => {
                      this.setState({ comment: value });
                    }}
                    value={comment}
                    autoCorrect={false}
                    multiline
                    numberOfLines={8}
                  />
                </View>
              </View>
            </View>
            {traffic === 0 ? (
              <View style={[styles.formBlock, { justifyContent: 'center', marginTop: 50 }]}>
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
Comment.propTypes = {
  eventId: PropTypes.number.isRequired,
};
export default Comment;
