import React, {Component} from "react";
import {
    TouchableHighlight,
    StyleSheet,
    Text,
    TextInput,
    View,
    Modal,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions
} from "react-native";
import {connect} from "react-redux";

import RoundedButton from "../Components/RoundedButton.js";

import ModalDropdown from 'react-native-modal-dropdown';

class TripSelectionComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tripName: this.props.tripState.activeTrip
                ? this.props.tripState.activeTrip.name
                : "",
            tripModalVisible: false
        };
    }

    setTripModalVisible(visible) {
        this.setState({tripModalVisible: visible});
    }

    addNewTrip(name) {
        if (!!name) {
            this
                .props
                .uploadTrip(name);
        }
    }

    tripSelected(index, title) {
        if (index == this.props.tripState.trips.length) {
            this.setTripModalVisible(!this.state.tripModalVisible)
            // this   .refs   .tripDropDown   .hide() return false
        }
        this
            .props
            .changeActiveTrip(this.props.tripState.trips[index]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.tripModalVisible}
                    onRequestClose=
                    { () => { alert("Modal has been closed.") } }>
                    <View style={styles.modalContainer}>
                        <View>
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

                            <RoundedButton
                                text="Add Trip"
                                onPress={() => {
                                this.addNewTrip(this.state.tripName);
                                this.setTripModalVisible(!this.state.tripModalVisible)
                            }}/>
                            <RoundedButton
                                text="Cancel"
                                onPress={() => {
                                this.setTripModalVisible(!this.state.tripModalVisible)
                            }}/>

                        </View>
                    </View>
                </Modal>
                <ModalDropdown
                    ref="tripDropDown"
                    style={styles.tripDropDown}
                    options=
                    { this .props .tripState .trips .map(trip => { return trip.name }) .concat('+') }
                    defaultValue={this.props.tripState.activeTrip
                    ? this.props.tripState.activeTrip.name
                    : 'Please select a trip'}
                    onSelect=
                    { (idx, value) => this.tripSelected(idx, value) }/>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {tripState: state.tripState};
}

export default connect(mapStateToProps)(TripSelectionComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(100,0,155,0.7)",
        height: 20
    },
    modalContainer: {
        marginTop: 22,
        backgroundColor: "rgba(100,100,100,0.3)"
    },
    tripDropDown: {
        flex: 1,
        top: 32,
        height: 20
    }
});