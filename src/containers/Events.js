import React from 'react';
import {
  Text, View, TouchableHighlight, StatusBar, FlatList,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

class Events extends React.Component {
  state = {
    respoData: '',
  };

  componentWillMount() {}

  componentDidMount() {
    fetch('https://eventlocate.herokuapp.com/api/events', { method: 'GET' })
      .then(response => response.json())
      .then((responseData) => {
        this.setState({ respoData: responseData });
      })
      .catch(() => (
        alert('Something went wrong!')
      ))
      .done();
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

  viewEvent = (id, lat, long) => Actions.event({ eventId: id, lat, long });

  render() {
    const { respoData } = this.state;
    return (
      <View style={{ flex: 1, paddingTop: 54, flexDirection: 'row' }}>
        <StatusBar backgroundColor="rgba(25, 43, 62, 0.9)" barStyle="light-content" />
        {respoData ? (
          <FlatList
            data={respoData}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => {
              const { id, lat, lng } = item;
              return (
                <TouchableHighlight
                  onPress={() => this.viewEvent(id, lat, lng)}
                  underlayColor="rgba(25, 43, 62, 0.1)"
                >
                  <View
                    style={{
                      padding: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: 'rgba(0,0,0,0.1)',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 'bold',
                        color: 'rgba(25, 43, 62, 0.9)',
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text>{item.description}</Text>
                    <Text style={{ paddingTop: 5, color: 'rgba(25, 43, 62, 0.9)' }}>
                      <Icon name="md-pin" />
                      &nbsp;&nbsp;&nbsp;
                      {item.formatted_address}
                      &nbsp;&nbsp;&nbsp;
                      <Icon name="md-person" />
                      &nbsp;&nbsp;&nbsp;
                      {item.host}
                      &nbsp;&nbsp;&nbsp;
                      <Icon name="md-calendar" />
                      &nbsp;&nbsp;
                      {item.date}
                      &nbsp;&nbsp;&nbsp;
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#555' }}>Loading ...</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Events;
