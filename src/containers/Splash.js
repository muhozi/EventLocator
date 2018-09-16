'use strict';
import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  AlertAndroid,
  Button,
  ScrollView,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import {
Actions,  
} from 'react-native-router-flux';
import Styles from './../styles/Styles';
//import Icon from 'react-native-vector-icons/FontAwesome';
class Splash extends React.Component {

  componentWillMount () {
        //var navigator = this.props.navigator;
        setTimeout (() => {
            Actions.events()
        }, 2000); 
    }
  render() {
    return (

      <View style={styles.splashContainer}>
      <StatusBar
         backgroundColor="#fff"
         barStyle="light-content"
         hidden={true}
      />
        <View>
          <Image
          source={require('../icons/launcher_banner.png')} />
          
        </View>
      </View>
    );
  }
}
var styles = Styles;
export default Splash;