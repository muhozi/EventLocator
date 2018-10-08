import React from 'react';
import { View, StatusBar, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Styles from '../styles/Styles';
import logo from '../icons/launcher_banner.png';

class Splash extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      Actions.events();
    }, 2000);
  }

  render() {
    const styles = Styles;
    return (
      <View style={styles.splashContainer}>
        <StatusBar backgroundColor="#fff" barStyle="light-content" hidden />
        <View>
          <Image source={logo} />
        </View>
      </View>
    );
  }
}
export default Splash;
