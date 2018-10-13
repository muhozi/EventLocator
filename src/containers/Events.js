import React from 'react';
import {
  Text, View, TouchableHighlight, StatusBar, FlatList,
} from 'react-native';
import * as Progress from 'react-native-progress';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles, { colors } from '../styles/Styles';
import apiUrl from '../utils';

class Events extends React.Component {
  state = {
    events: '',
    refreshingEvents: false,
  };

  componentDidMount() {
    this.fetchEvents();
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

  fetchEvents = () => {
    fetch(`${apiUrl}/events`, { method: 'GET' })
      .then(response => response.json())
      .then((events) => {
        this.setState({ events, refreshingEvents: false });
      })
      .catch(() => alert('Something went wrong!'))
      .done();
  };

  refreshEvents = () => {
    this.setState({ refreshingEvents: true });
    this.fetchEvents();
  };

  viewEvent = eventDetails => Actions.event({ eventDetails });

  render() {
    const { events, refreshingEvents } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(25, 43, 62, 0.9)" barStyle="light-content" />
        {events ? (
          <FlatList
            data={events}
            keyExtractor={event => String(event.id)}
            refreshing={refreshingEvents}
            onRefresh={this.refreshEvents}
            renderItem={({ item: event }) => (
              <TouchableHighlight
                onPress={() => this.viewEvent(event)}
                underlayColor="rgba(25, 43, 62, 0.1)"
              >
                <View style={styles.eventListRow}>
                  <Text style={styles.eventListRowTitle}>{event.title}</Text>
                  <Text>{event.description}</Text>
                  <Text style={styles.eventListRowDetails}>
                    <Icon name="md-pin" />
                    &nbsp;&nbsp;&nbsp;
                    {event.formatted_address}
                    &nbsp;&nbsp;&nbsp;
                    <Icon name="ios-person" />
                    &nbsp;&nbsp;&nbsp;
                    {event.host}
                    &nbsp;&nbsp;&nbsp;
                    <Icon name="ios-calendar" />
                    &nbsp;&nbsp;
                    {event.date}
                    &nbsp;&nbsp;&nbsp;
                  </Text>
                </View>
              </TouchableHighlight>
            )}
          />
        ) : (
          <View style={styles.loaderContainer}>
            <Progress.Circle size={80} indeterminate color={colors.primary} />
            <Text>{'\n\n'}</Text>
            <Text>Loading ...</Text>
          </View>
        )}
      </View>
    );
  }
}

export default Events;
