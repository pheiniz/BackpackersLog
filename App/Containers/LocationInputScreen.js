import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";

import MapComponent from "../Components/MapComponent.js";
import RoundedButton from "../Components/RoundedButton.js";

class LocationInputScreen extends Component {
  addMarker() {
    this.props.fetchMarkers();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent />
        <TextInput
          style={styles.textInput}
          placeholder="Been there"
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          onChangeText={text => console.log(text)}
        />
        <RoundedButton
          text="SEND"
          onPress={() => {
            this.addMarker();
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedMarkers: state.savedMarkers
  };
}

export default connect(mapStateToProps)(LocationInputScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,155,0.7)"
  },
  textInput: {
    height: 30,
    marginHorizontal: 50,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.7)"
  }
});
