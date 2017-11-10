import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import {
    Button,
    Card,
    Icon,
    ProgressBar
} from 'react-materialize';

import Header from "../components/header"

let errorCode = null;

class SinglePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            loadApi: true,
            redirect: ''
        }
    }

    componentWillReceiveProps(props) {
        this.loadApi(props.match.params.id);
    }

    componentDidMount() {
        this.loadApi(this.props.match.params.id);
    }

    loadApi = (id) => {

        this.setState({
            data: null
        });

        // Get data from API
        fetch('http://localhost:1337/'+ id)
        // parse response
            .then((res, next) => {
                if(res.ok){
                    return res.json();
                }else{
                    errorCode = res.status;
                    next();
                }
            })
            .catch((err) => {
                if(errorCode === 404){
                    this.setState({
                        redirect: <Redirect from={`/${this.props.match.params.id}`} to="/error-404"/>
                    })
                }
            })
            // use parsed response
            .then((json) => {
                this.setState({
                    data: json
                });
            });
    };

    render() {
        const {data, redirect} = this.state;

        let info_pont_close = "";
        if (data) {
            if (data.totale === true) {
                info_pont_close = <div><Icon>block</Icon> Fermeture totale </div>;
            }
        }

        return (
            <div>

                {!redirect ? (
                    <Header id={this.props.match.params.id}/>
                ) : (<div>{redirect}</div>)}

                {!data ? (
                    <ProgressBar/>
                ) : (
                    <div>

                        {redirect}

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
