import React, { Component } from 'react';
import List from './../components/list';
import { ProgressBar } from 'react-materialize';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
    }
  }

  componentDidMount() {

    // Get data from API
    fetch('http://localhost:5000')
      // parse response
      .then((res) => res.json())
      // use parsed response
      .then((json) => {
        this.setState({
          data: json,
        });
      });
  }

  render() {

    const { data } = this.state;

    return (
      <div>

        <h2> HomePage </h2>



        {!data ? (
          <ProgressBar />
        ) : (
          <div>
            <List data={data} />
          </div>
        )}
      </div>
    );
  }

}

export default HomePage;
