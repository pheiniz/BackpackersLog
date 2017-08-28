import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from "react-native";
import {connect} from "react-redux";

import Firebase from "../Config/Firebase.js";

import MapComponent from "../Components/MapComponent.js";
import RoundedButton from "../Components/RoundedButton.js";

class LocationInputScreen extends Component {

  constructor(props) {
    super(props);

    this.markerRef = Firebase
      .database()
      .ref("markers");

    this.tripRef = Firebase
      .database()
      .ref("trips");

    this.state = {
      tripName: this.props.tripState.activeTrip
        ? this.props.tripState.activeTrip.name
        : ""
    };
  }

  componentDidMount() {
    this.listenForMarkers(this.markerRef);
    this.listenForTrips(this.tripRef);
  }

  listenForMarkers(markerRef) {

    markerRef.on("value", snap => {
      // get children as an array
      var markers = [];
      snap.forEach(marker => {
        // if (this.props.markerState.markers.filter(x=>x.key === marker.key).length ==
        // 0){
        markers.push({
          latitude: marker
            .val()
            .latitude,
          longitude: marker
            .val()
            .longitude,
          key: marker.key
        });
      });

      this
        .props
        .addMarkers(markers);
    });
  }

  listenForTrips(tripRef) {

    tripRef.on("value", snap => {
      // get children as an array
      var trips = [];
      snap.forEach(trip => {
        trips.push({
          name: trip
            .val()
            .name,
          key: trip.key
        });
      });

      this
        .props
        .addTrips(trips);

      if (!this.props.tripState.activeTrip || this.props.tripState.trips.length == 0) {
        this
          .props
          .changeActiveTrip(trips[0]);
      }
    });
  }

  addNewTrip(name) {
    let trip = {
      name: name,
      initDate: Firebase.database.ServerValue.TIMESTAMP
    }
    this
      .props
      .uploadTrip(trip);
  }

  addNewMarker(text) {
    if (this.props.tripState.activeTrip) {

      let escapedText = text
        ? text
        : "";
      this
        .refs
        .map
        .getWrappedInstance()
        .addMarker(escapedText);

    } else {
      alert("!!!")
      this.refs.tripTitle.value = "!!!";

    }
  }

  logout() {
    this
      .props
      .signOutUser();
  }

  render() {
    return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <TextInput
              ref="tripTitle"
              style={styles.textInput}
              onChangeText={(text) => this.setState({tripName: text})}
              value={this.state.tripName}
              placeholder="Give your trip a name like 'Backpacking Asia' or 'Berlin in summer'"
              returnKeyType="done"
              blurOnSubmit={true}
              multiline={true}
              onSubmitEditing={event => this.addNewTrip(event.nativeEvent.text)}
              enablesReturnKeyAutomatically={true}/>
            <MapComponent style={styles.map} ref="map" {...this.props}/>
            <TextInput
              ref="markerTextInput"
              style={styles.textInput}
              placeholder="Been there"
              multiline={true}
              enablesReturnKeyAutomatically={true}/>
            <RoundedButton
              text="Add Marker"
              onPress={() => {
              this.addNewMarker(this.refs.markerTextInput._lastNativeText)
            }}/>
            <RoundedButton
              text="Logout"
              onPress={() => {
              this.logout();
            }}/>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }
}

function mapStateToProps(state) {
  return {markerState: state.markerState, tripState: state.tripState};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps)(LocationInputScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,155,0.7)"
  },
  textInput: {
    height: 60,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
