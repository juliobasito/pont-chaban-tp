import React, { Component } from 'react';

import {
    Link,
    Redirect
} from 'react-router-dom';

import {
    Button,
    Card,
    Col,
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
                ) : (<div>
                    <Col s={4} className='grid-example'>
                        <Link
                            to="/"
                        >
                            <Icon>home</Icon>
                        </Link>
                    </Col>
                    {redirect}</div>)}

                {!data ? (
                    <ProgressBar/>
                ) : (
                    <div>

                        {redirect}

                        <Card className='blue-grey darken-1' textClassName='white-text' title={data.date} actions={<a href={data.link} target="_blank">Pour plus d'informations</a>}>
                            {info_pont_close} <br/>
                            De {data.start} Jusqu'à {data.end}. <br/>
                            Pour cause de {data.reason} <br/>
                        </Card>
                    </div>
                )}

            </div>
        );
    }

}

export default SinglePage;
