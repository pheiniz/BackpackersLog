import React, {Component} from "react";

import DatePicker from 'react-native-datepicker'
import Moment from 'moment';

class DatePickerComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: new Date()
        };
    }

    render() {
        return (<DatePicker
            style={{
            width: 200
        }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY/MM/DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36,
                borderWidth: 0.5
            }
        }}
            onDateChange={(date) => {
            this.setState({
                date: Moment(date, "YYYY/MM/DD").toDate()
            })
        }}/>)
    }
}

export default DatePickerComponent;