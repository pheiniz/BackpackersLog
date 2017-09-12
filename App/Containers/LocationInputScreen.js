import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import {connect} from "react-redux";

import Firebase from "../Config/Firebase.js";

import MapComponent from "../Components/MapComponent.js";
import RoundedButton from "../Components/RoundedButton.js";

import DatePickerComponent from "../Components/DatePickerComponent.js";
import TripSelectionComponent from "../Components/TripSelectionComponent.js";

class LocationInputScreen extends Component {

  constructor(props) {
    super(props);

    this.tripRef = Firebase
      .database()
      .ref("trips");
  }

  componentDidMount() {
    this.listenForTrips(this.tripRef);
  }

  listenForTrips(tripRef) {

    tripRef.on("value", snap => {
      // get children as an array
      var trips = [];

      snap.forEach(trip => {
        trips.push({
          key: trip.key,
          name: trip
            .val()
            .name,
          markers: trip
            .val()
            .markers || []
        });
      });

      this
        .props
        .addTrips(trips);

      // if (!this.props.tripState.activeTrip || this.props.tripState.trips.length ==
      // 0) {
      var randomTripIndex = Math.floor(Math.random() * this.props.tripState.trips.length)
      this
        .props
        .changeActiveTrip(trips[randomTripIndex]);
      //}

      this
        .props
        .addMarkers(this.props.tripState.activeTrip.markers);

    });
  }

  addNewMarker(date, text) {
    if (this.props.tripState.activeTrip) {

      let escapedText = text
        ? text
        : "";
      this
        .refs
        .map
        .getWrappedInstance()
        .addMarker(date, escapedText);

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
            <TripSelectionComponent {...this.props}/>
            <MapComponent style={styles.map} ref="map" {...this.props}/>
            <View style={styles.bottomInputView}>
              <DatePickerComponent ref="datePicker"/>
              <TextInput
                ref="markerTextInput"
                style={styles.textInput}
                placeholder="Been there"
                multiline={true}
                enablesReturnKeyAutomatically={true}/>
              <RoundedButton
                text="Add Marker"
                onPress={() => {
                this.addNewMarker(this.refs.datePicker.state.date.valueOf(), this.refs.markerTextInput._lastNativeText)
              }}/>
              <RoundedButton
                text="Logout"
                onPress={() => {
                this.logout();
              }}/>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }
}

function mapStateToProps(state) {
  return {tripState: state.tripState};
}

export default connect(mapStateToProps)(LocationInputScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,0,155,0.7)"
  },
  bottomInputView: {
    flex: 1,
    flexDirection: "column",
    width: Dimensions
      .get('window')
      .width,
    alignItems: "center",
    backgroundColor: "rgba(255,0,155,0.7)"
  },
  textInput: {
    height: 60,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,0,0.7)"
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 500
  },
  tripDropDown: {
    flex: 1,
    top: 32,
    height: 20
  }
});
