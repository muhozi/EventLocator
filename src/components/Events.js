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
  ScrollView,
  StatusBar,
  NetInfo,
  FlatList,
} from 'react-native';
import MapView from 'react-native-maps';
import {
Actions,  
} from 'react-native-router-flux';
import Styles from './../styles/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
class Events extends React.Component {

  state = {
      isConnected: null,
      responseMsg: "",
      respoData: "",
  }
  componentWillMount () {

      

  }
  componentDidMount() {
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({isConnected}); }
    );
    fetch('http://eventlocate.herokuapp.com/api/events',{method: 'GET'})
    //fetch('http://192.168.244.2/eventLocator/public/api/events',{method: 'GET'})
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({respoData:responseData})
              //console.log(this.state.respoData);
            })
            .catch((error) => {
              this.setState({statusColor: 'rgba(255,0,0,1)'})
              this.setState({responseMsg:"Internet network failed !"})
              //console.log(error)
            })
            .done();
            //console.log(this.state.respoData);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
  };
  onLayout(e) {
    const {nativeEvent: {layout: {height}}} = e;
    this.height = height;
    this.forceUpdate();
  }
  //Send Report to DB
  //Render View
  render() {
    return (
      <View style={{flex:1,paddingTop:54,flexDirection:'row'}}>
            <StatusBar
             backgroundColor="rgba(25, 43, 62, 0.9)"
             barStyle="light-content"
           />
        {(this.state.respoData)?<FlatList
          data={this.state.respoData}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <TouchableHighlight onPress={this.viewEvent.bind(this, item.id,item.lat,item.lng)} underlayColor={"rgba(25, 43, 62, 0.1)"}>
            <View style={{padding:10,borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,0.1)'}}>
            <Text style={{fontWeight: 'bold',color: 'rgba(25, 43, 62, 0.9)'}}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={{paddingTop:5,color: 'rgba(25, 43, 62, 0.9)'}}>
                  <Icon name="md-pin"/>&nbsp;&nbsp;&nbsp;
                  {item.formatted_address}&nbsp;&nbsp;&nbsp;
                  <Icon name="md-person"/>&nbsp;&nbsp;&nbsp;
                  {item.host}&nbsp;&nbsp;&nbsp;
                  <Icon name="md-calendar"/>&nbsp;&nbsp;
                  {item.date}&nbsp;&nbsp;&nbsp;

                  </Text>
            </View>
            </TouchableHighlight>
        }
        />:<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{color:'#555'}}>Loading ...</Text></View>}
      </View>
    ); 
  }
  viewEvent(id,lat,long){
        Actions.event({event_id:id,lat:lat,long:long});
         
    }
}
const styles = Styles;
export default Events;