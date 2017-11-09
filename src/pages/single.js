import React, { Component } from 'react';

import {
    Button,
    Card,
    Icon,
    ProgressBar
} from 'react-materialize';

import Header from "../components/header"


class SinglePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loadApi: true
        }
    }

    componentWillUpdate() {
        setTimeout(this.loadApi, 1000);
    }

    componentDidMount() {
        this.loadApi();
    }

    loadApi = () => {

        // Get data from API
        fetch('http://localhost:1337/'+ this.props.match.params.id)
        // parse response
            .then((res) => res.json())
            // use parsed response
            .then((json) => {
                this.setState({
                    data: json
                });
            });
    };

    render() {
        const {data} = this.state;

        let info_pont_close = "";
        if (data !== null && data.totale === true) {
            info_pont_close = <div><Icon>block</Icon> Fermeture totale </div>;
        }

        return (
            <div>

                <Header id={this.props.match.params.id}/>

                {!data ? (
                    <ProgressBar/>
                ) : (
                    <div>

                        <Card className='blue-grey darken-1' textClassName='white-text' title={data.date}>
                            {info_pont_close} <br/>
                            De {data.start} Jusqu'à {data.end}. <br/>
                        Pour cause de {data.reason} <br/>
                            <Button waves='light' node='a' href={data.link}> Pour plus d'informations </Button>
                        </Card>
                    </div>
                )}

            </div>
        );
    }

}

export default SinglePage;
