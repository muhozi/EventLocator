'use strict';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ScrollView,
  StatusBar,
  NetInfo,
} from 'react-native';
import MapView from 'react-native-maps';
import {
Actions,  
} from 'react-native-router-flux';
import Styles from './../styles/Styles';
import Icon from 'react-native-vector-icons/Ionicons';
class SingleEvent extends React.Component {


  state = {
      isConnected: null,
      responseMsg: "",
      eventData: "",
      coordinates:"",
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
     fetch('http://eventlocator.regeza.com/api/events/'+this.props.event_id,{method: 'GET'})
     //fetch('http://192.168.244.2/eventLocator/public/api/events/'+this.props.event_id,{method: 'GET'})
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({eventData:responseData})
              var b = [latitude:responseData.lat,longitude:responseData.lng]
              var a = getCoordinates(b)
              //this.setState({coordinates:a.latitude})
              console.log('dfdtfghjfgvhbnfgvbhnf');
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
      <View style={{flex:1,paddingTop:0,flexDirection:'row'}}>
            <StatusBar
             backgroundColor="rgba(25, 43, 62, 0.9)"
             barStyle="light-content"
             StatusBarAnimation="slide"
           />
           <View style={{backgroundColor: "rgba(25, 43, 62, 0.9)",flex:1,flexDirection:'row',height:53,}}>
                <View style={{flex:1,justifyContent:'center',paddingLeft:10}}>
                  <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} onPress={()=>{Actions.pop()}}>
                    <View>
                        <Text style={{color:'#ffffff'}}><Icon name="md-arrow-back" size={24}/></Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{flex:9,justifyContent:'center',flexDirection:'row'}}>
                  
                <View style={{flex:4,justifyContent: 'center',alignItems:'flex-end',paddingRight:10,}}>
                  <TouchableHighlight underlayColor={'rgba(255,255,255,0.3)'} onPress={()=>{(this.state.eventData.id)?Actions.reserve({event_id:this.state.eventData.id}):null}} style={{borderRadius:5,}}>
                    <Text style={{color:'#fff',fontSize:18,borderWidth:0,borderRadius:5,paddingTop:5,paddingBottom:5,backgroundColor:'rgba(255,255,255,0.5)',paddingLeft:10,paddingRight:10}}>Reserve</Text>
                  </TouchableHighlight>
                </View>
                  
                  
                <View style={{flex:5,justifyContent: 'center',alignItems:'flex-start',paddingLeft:10,}}>
                  <TouchableHighlight underlayColor={'rgba(255,255,255,0.3)'} onPress={()=>{(this.state.eventData.id)?Actions.comment({event_id:this.state.eventData.id}):null}} style={{borderRadius:5,}}>
                    <Text style={{color:'#fff',fontSize:18,borderWidth:0,borderRadius:5,paddingTop:5,paddingBottom:5,backgroundColor:'rgba(255,255,255,0.5)',paddingLeft:10,paddingRight:10}}>Comment</Text>
                  </TouchableHighlight>
                </View>
                  
                </View>
              </View>
            {(this.state.eventData.lat)?
          <MapView.Animated
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(this.state.eventData.lat),
                longitude: parseFloat(this.state.eventData.lng),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
            <MapView.Marker
              coordinate={{longitude:parseFloat(this.state.eventData.lng),latitude:parseFloat(this.state.eventData.lat)}}
              title={'Location'}
              description={this.state.eventData.formatted_address}>
              <View style={{backgroundColor:'rgba(25, 43, 62, 0.4)',height:50,width:50,borderRadius:50/2,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'rgba(25, 43, 62, 0.9)',overflow:'hidden'}}>
                <View style={{backgroundColor:'rgba(25, 43, 62, 0.9)',height:20,width:20,borderRadius:20/2,borderWidth:1,borderColor:'#fff'}}></View>
              </View>
              </MapView.Marker>
              
          </MapView.Animated>

            :null}
            
              
              
         

      </View>
    ); 
  }
}
const styles = Styles;
export default SingleEvent;