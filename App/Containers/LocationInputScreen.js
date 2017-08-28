import React, {Component} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";
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
  }

  componentDidMount() {
    this.listenForMarkers(this.markerRef);
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
        // } else {   console.log("key doublicate", markers.length) }
      });

      this
        .props
        .addMarkers(markers);
    });
  }

  logout() {
    this
      .props
      .signOutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="tripTitle"
          style={styles.textInput}
          placeholder="Give your trip a name like 'Backpacking Asia' or 'Berlin in summer'"
          returnKeyType="done"
          blurOnSubmit={true}
          multiline={true}
          onSubmitEditing={event => alert('submit search')}
          enablesReturnKeyAutomatically={true}/>
        <MapComponent style={styles.map} ref="map" {...this.props}/>
        <TextInput
          ref="markerTextInput"
          style={styles.textInput}
          placeholder="Been there"
          multiline={true}
          onEndEditing={event => alert('submit search')}
          enablesReturnKeyAutomatically={true}/>
        <RoundedButton
          text="Add Marker"
          onPress={() => {
          var text = this.refs.markerTextInput._lastNativeText
            ? this.refs.markerTextInput._lastNativeText
            : "";
          this
            .refs
            .map
            .getWrappedInstance()
            .addMarker(text);
        }}/>
        <RoundedButton
          text="Logout"
          onPress={() => {
          this.logout();
        }}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {markerState: state.markerState};
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
