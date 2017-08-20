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
import { connect } from "react-redux";
import Marker from "../Objects/marker.js";

import Firebase from "../Config/Firebase.js";

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

    var marker = new Marker("123", "!", "321", 123, 123);
    alert(marker.name);

    this.markerRef = Firebase.database().ref();

    this.onMapPress = this.onMapPress.bind(this);
  }

  componentDidMount() {
    this.listenForMarkers(this.markerRef);
  }

  listenForMarkers(markerRef) {
    markerRef.on("value", snap => {
      // get children as an array
      var markers = [];
      snap.forEach(marker => {
        markers.push({
          latitude: marker.val().latitude,
          longitude: marker.val().longitude,
          key: marker.key
        });
      });

      this.setState({ markers: markers });

      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(items)
      // });
    });
  }

  getPlaceForCoordinates() {
    var coords = {
      lat: this.state.region.latitude,
      lng: this.state.region.longitude
    };

    let ret = Geocoder.geocodePosition(coords)
      .then(res => {
        var locality =
          res["0"].locality == null
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
          // coordinate: e.nativeEvent.coordinate,
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          key: `foo${id++}`
        }
      ]
    });
    this.markerRef.push({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      key: `foo${id++}`
    });
  }

  addMarker(markerText) {
    var coords = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };

    var marker = {
      markerId: "invalidID",
      name: "",
      text: markerText,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    };

    //new Marker(afads, adsfasd, adfasd) verwenden

    this.props.uploadMarker(marker);
    alert(markerText);
    this.markerRef.push({
      markerId: "invalidID",
      name: "",
      markerText: markerText,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
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
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
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

function mapStateToProps(state) {
  return {
    markerState: state.markerState
  };
}

// export default connect(mapStateToProps)(MapComponent);
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
    width: 300
  },
  place: {
    textAlign: "center"
  }
});
