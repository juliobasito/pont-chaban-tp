import React, { Component } from 'react';

class searchInput extends Component {

  handleChange = (event) => {
    const newValue = event.target.value;
    this.props.putNewDate(newValue, this.props.nameInput)
  };

  render() {
    return (
      <input type="date" value={this.props.inputValue} onChange={this.handleChange} name={this.props.nameInput}/>
    );
  }
}

export default searchInput;
