/**
 * TODO: Refactor codes
 *
 */
import React from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';
import { setCustomTextInput } from 'react-native-global-props';
import Splash from './containers/Splash';
import Events from './containers/Events';
import SingleEvent from './containers/SingleEvent';
import Reserve from './containers/Reserve';
import Comment from './containers/Comment';

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
          backgroundColor: 'rgba(25, 43, 62, 0.9)',
        }}
        animation="fade"
        type={ActionConst.RESET}
      />
      <Scene
        key="event"
        title="Event details"
        hideNavBar
        component={SingleEvent}
        titleStyle={{ color: '#ffffff', fontSize: 18 }}
        navigationBarStyle={{
          borderBottomWidth: 0,
          backgroundColor: 'rgba(25, 43, 62, 0.9)',
        }}
        animation="fade"
      />
      <Scene
        key="reserve"
        title="Reserve"
        hideNavBar
        direction="vertical"
        component={Reserve}
        schema="modal"
      />
      <Scene
        key="comment"
        title="Comment"
        hideNavBar
        renderBackButton={() => null}
        direction="vertical"
        component={Comment}
        schema="modal"
      />
    </Scene>
  </Router>
);

export default App;
