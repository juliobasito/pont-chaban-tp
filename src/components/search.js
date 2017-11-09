import React, { Component } from 'react';
import SearchInput from './searchInput';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValueBegin: 0,
            inputValueEnd: 0
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
        if (this.state.inputValueBegin !== 0 || this.state.inputValueEnd !== 0) {
            this.props.changeApiDate(this.state.inputValueBegin, this.state.inputValueEnd)
        }
    };

    render() {
        return (
            <div>
              <SearchInput inputValue={this.state.inputValueBegin} putNewDate={this.putNewDate} nameInput="begin-date"/>
              <SearchInput inputValue={this.state.inputValueEnd} putNewDate={this.putNewDate} nameInput="end-date"/>
              <input type="submit" onClick={this.changeDate} />
            </div>
        );
    }
}

export default Search;
