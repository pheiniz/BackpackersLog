import React, {Component} from "react";
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
import {connect} from "react-redux";
import Marker from "../Objects/marker.js";

import Firebase from "../Config/Firebase.js";

const {width, height} = Dimensions.get("window");

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
      polylines: [],
      markers: []
    };
  }

  componentDidMount() {
    navigator
      .geolocation
      .getCurrentPosition((position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      }, (error) => alert(error.message), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }

  getPlaceForCoordinates() {
    var coords = {
      lat: this.state.region.latitude,
      lng: this.state.region.longitude
    };

    let ret = Geocoder
      .geocodePosition(coords)
      .then(res => {
        var locality = res["0"].locality == null
          ? res["0"].country
          : res["0"].locality + "\n" + res["0"].country;
        this.setState({place: locality});
      })
      .catch(err => console.log(err));
  }

  onRegionChange(region) {
    this.setState({region});
    this.getPlaceForCoordinates(region);
  }

  addMarker(date, markerText) {
    var coords = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };
    alert(date)
    var marker = {
      markerId: "invalidID",
      name: "",
      date: date,
      text: markerText,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      initDate: Firebase.database.ServerValue.TIMESTAMP
    };

    // var marker = new Marker("123", "!", "321", 123, 123); alert(marker.name);
    // alert(this.props.markerState.markers.length)
    this
      .props
      .uploadMarker(marker);

    //   console.log("!!Terst@@@!!!", this.props.markerState.markers)

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
          onRegionChangeComplete={region => this.onRegionChange(region)}>

          {this
            .props
            .tripState
            .trips
            .map(trip => {

              return Object
                .keys(trip.markers)
                .map((key) => {
                  let marker = trip.markers[key]

                  return < MapView.Marker
                  title = {
                    key
                  }
                  key = {
                    key
                  }
                  coordinate = {{
                    latitude: marker.latitude,
                    longitude: marker.longitude
                  }}
                  onPress = {
                    (event) => alert(marker.text)
                  }
                  />
                })
            })}
          {this
            .props
            .tripState
            .trips
            .map(trip => {

              let activeTripKey = this.props.tripState.activeTrip
                ? this.props.tripState.activeTrip.key
                : 0

              return < MapView.Polyline
              key = {
                trip.key
              }
              coordinates = {
                Object
                  .keys(trip.markers)
                  .map((key) => {
                    let marker = trip.markers[key]
                    return {latitude: marker.latitude, longitude: marker.longitude}
                  })
              }
              strokeColor = {
                trip.key == activeTripKey
                  ? "rgba(255,0,0,1)"
                  : "rgba(0,0,0,0.5)"
              }
              fillColor = "rgba(255,0,130,0.5)"
              strokeWidth = {
                5
              }
              />})}
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

function mapStateToProps(state) {
  return {markerState: state.markerState, tripState: state.tripState};
}

export default connect(mapStateToProps, null, null, {withRef: true})(MapComponent);
// export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "rgba(0,255,255,0.7)"
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
    width: 300
  },
  place: {
    textAlign: "center"
  }
});
