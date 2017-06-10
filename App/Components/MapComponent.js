import React, { Component } from "react";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoder";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const PLACE = "searching position";
let id = 0;

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      place: PLACE,
      markers: []
    };

    this.onMapPress = this.onMapPress.bind(this);
  }

  getPlaceForCoordinates(region) {
    var coords = {
      lat: this.state.region.latitude,
      lng: this.state.region.longitude
    };

    let ret = Geocoder.geocodePosition(coords)
      .then(res => {
        var locality = res["0"].locality == null
          ? res["0"].country
          : res["0"].locality + "\n" + res["0"].country;
        this.setState({ place: locality });
      })
      .catch(err => console.log(err));
  }

  onRegionChange(region) {
    this.setState({ region });
    this.getPlaceForCoordinates(region);
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`
        }
      ]
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={this.onMapPress}
          onRegionChangeComplete={region => this.onRegionChange(region)}
        >
          {this.state.markers.map(marker =>
            <MapView.Marker
              title={marker.key}
              key={marker.key}
              coordinate={marker.coordinate}
            />
          )}
        </MapView>
        <View style={styles.bubble}>
          <Text style={styles.place}>
            {/* {this.state.region.latitude.toPrecision(7)},  */}
            {/* {this.state.region.longitude.toPrecision(7)},  */}
            {this.state.place}
          </Text>
        </View>
      </View>
    );
  }
}

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCF0"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    width: 200
  },
  place: {
    textAlign: "center"
  }
});
