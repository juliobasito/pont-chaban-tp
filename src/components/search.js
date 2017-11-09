import React, { Component } from 'react';
import SearchInput from './searchInput';
import {
  Button,
  Icon
} from 'react-materialize';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValueBegin: null,
            inputValueEnd: null
        };
    }

    putNewDate = (newValue, nameInput) => {
        if (nameInput === 'begin-date') {
            this.setState({
                inputValueBegin: newValue
            })
        }
        if (nameInput === 'end-date') {
            this.setState({
                inputValueEnd: newValue
            })
        }
    };

    changeDate = () => {
        if (this.state.inputValueBegin !== null || this.state.inputValueEnd !== null) {
            this.props.changeApiDate(this.state.inputValueBegin, this.state.inputValueEnd)
        }
    };

    render() {
        return (
            <div>
              <SearchInput inputValue={this.state.inputValueBegin} putNewDate={this.putNewDate} nameInput="begin-date"/>
              <SearchInput inputValue={this.state.inputValueEnd} putNewDate={this.putNewDate} nameInput="end-date"/>
                <Button waves='light' onClick={this.changeDate}>Valider<Icon left>insert_chart</Icon></Button>
            </div>
        );
    }
}

export default Search;
