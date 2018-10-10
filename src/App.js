import React from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import { setCustomTextInput } from 'react-native-global-props';
import Splash from './containers/Splash';
import Events from './containers/Events';
import SingleEvent from './containers/SingleEvent';
import Reserve from './containers/Reserve';
import Comment from './containers/Comment';
import { colors } from './styles/Styles';

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
};
setCustomTextInput(customTextInputProps);
const App = () => (
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
          backgroundColor: colors.primary,
        }}
        animation="fade"
        type={ActionConst.RESET}
      />
      <Scene
        key="event"
        title="Event details"
        component={SingleEvent}
        titleStyle={{ color: '#ffffff', fontSize: 18 }}
        navigationBarStyle={{
          borderBottomWidth: 0,
          backgroundColor: colors.primary,
        }}
        animation="fade"
        navBarButtonColor="#fff"
        leftButtonTextStyle={{ color: '#fff' }}
      />
      <Scene
        key="reserve"
        title="Reserve"
        direction="vertical"
        component={Reserve}
        titleStyle={{ color: '#ffffff', fontSize: 18 }}
        navigationBarStyle={{
          borderBottomWidth: 0,
          backgroundColor: colors.primary,
        }}
        schema="modal"
        navBarButtonColor="#fff"
        leftButtonTextStyle={{ color: '#fff' }}
      />
      <Scene
        key="comment"
        title="Comment"
        renderBackButton={() => null}
        direction="vertical"
        component={Comment}
        titleStyle={{ color: '#ffffff', fontSize: 18 }}
        navigationBarStyle={{
          borderBottomWidth: 0,
          backgroundColor: colors.primary,
        }}
        schema="modal"
        navBarButtonColor="#fff"
        leftButtonTextStyle={{ color: '#fff' }}
      />
    </Scene>
  </Router>
);

export default App;
