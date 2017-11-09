import React, { Component } from 'react';

import { ProgressBar } from 'react-materialize';


class SinglePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
        }
    }

    componentDidMount() {

        // Get data from API
        fetch('http://localhost:5000/'+ this.props.match.params.id)
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

        const {data} = this.state;

        let info_pont_close = "partielle";

        if (data !== null && data.totale === true) {
            info_pont_close = "totale";
        }

        return (
            <div>

                {!data ? (
                    <ProgressBar/>
                ) : (
                    <div>
                        <p>Fermeture du pont le {data.date} de {data.start} à {data.end}</p>
                        <p> La fermeture du pont est {info_pont_close} pour cause de {data.reason}</p>
                        <p>Pour plus d'infos <a href={data.link}>Suivre ce lien</a></p>
                    </div>
                )}

            </div>
        );
    }

}

export default SinglePage;
