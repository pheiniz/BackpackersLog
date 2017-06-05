import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import MapComponent from '../Components/MapComponent.js';
import RoundedButton from '../Components/RoundedButton.js';

import {LoginButton, AccessToken} from 'react-native-fbsdk';

class LocationInputScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapComponent></MapComponent>
        <TextInput style={styles.textInput}
          placeholder="Been there"
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          onChangeText={ (text) => console.log(text) }/>
          <RoundedButton
            text='SEND'
            onPress={() => window.alert('Rounded Button Pressed!')}
          />
          <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => alert("logout.")}/>
      </View>
    );
  }
}

export default LocationInputScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,155,0.7)'
  },
  textInput: {
    height: 30,
    marginHorizontal: 50,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
