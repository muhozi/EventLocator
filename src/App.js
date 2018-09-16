/**
 * TODO: Refactor codes
 *
 * TODO: Add code styles linting
 *
 */
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Router, Scene, Schema, ActionConst } from 'react-native-router-flux';
import Splash from './containers/Splash';
import Events from './containers/Events';
import SingleEvent from './containers/SingleEvent';
import Reserve from './containers/Reserve';
import Comment from './containers/Comment';
import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
};

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="splash"
            component={Splash}
            hideNavBar="true"
            title="Splash"
            titleStyle={{ color: '#009688', fontSize: 18 }}
            navigationBarStyle={{ borderBottomWidth: 0 }}
          />
          <Scene
            key="events"
            title="Events"
            component={Events}
            titleStyle={{ color: '#ffffff', fontSize: 18 }}
            navigationBarStyle={{
              borderBottomWidth: 0,
              backgroundColor: 'rgba(25, 43, 62, 0.9)'
            }}
            animation="fade"
            type={ActionConst.RESET}
          />
          <Scene
            key="event"
            title="Event details"
            hideNavBar={true}
            component={SingleEvent}
            titleStyle={{ color: '#ffffff', fontSize: 18 }}
            navigationBarStyle={{
              borderBottomWidth: 0,
              backgroundColor: 'rgba(25, 43, 62, 0.9)'
            }}
            animation="fade"
          />
          <Scene
            key="reserve"
            title="Reserve"
            hideNavBar={true}
            direction="vertical"
            component={Reserve}
            schema="modal"
          />
          <Scene
            key="comment"
            title="Comment"
            hideNavBar={true}
            renderBackButton={() => null}
            direction="vertical"
            component={Comment}
            schema="modal"
          />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
