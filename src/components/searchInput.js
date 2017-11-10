import React, { Component } from 'react';
import {
    Input
} from 'react-materialize';

class searchInput extends Component {

    handleChange = (event) => {
        const newValue = event.target.value;
        this.props.putNewDate(newValue, this.props.nameInput)
    };

    render() {
        return (
            <Input type="date" value={this.props.inputValue} onChange={this.handleChange} name={this.props.nameInput}/>
        );
    }
}

export default searchInput;
