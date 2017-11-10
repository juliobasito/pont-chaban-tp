import React, { Component } from 'react';
import List from './../components/list';
import { ProgressBar } from 'react-materialize';
import Search from './../components/search';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            api: 'http://localhost:1337'
        }
    }

    componentDidMount() {
        this.callApi();
    }

    callApi = () => {

        this.setState({
            data: null
        });

        // Get data from API
        fetch(this.state.api)
        // parse response
            .then((res, next) => {
                if (res.ok) {
                    console.log("Connexion à l'API réussi");
                    return res.json()
                }
                else{
                    console.log('Connexion à l\'API impossible');
                    next()
                }
            }).catch((err) => {
            if(err) {
                alert("Connexion impossible : " + err)
            }
        })
        // use parsed response
            .then((json) => {
                this.setState({
                    data: json,
                });
            });
    };

    changeApiDate = (beginDate, endDate) => {
        let beginDateFormat = new Date(beginDate);
        let endDateFormat = new Date(endDate);
        var beginDateFormatted = beginDateFormat.getDate() + "/" + (beginDateFormat.getMonth() + 1) + "/" + (beginDateFormat.getYear() - 100);
        var endDateFormatted = endDateFormat.getDate() + "/" + (endDateFormat.getMonth() + 1)  + "/" + (endDateFormat.getYear() - 100);
        this.setState({
            api: 'http://localhost:1337?from=' + beginDateFormatted + '&to=' + endDateFormatted
        });

        // If a tiemout is not set, the list will not be set immediately.
        setTimeout(this.callApi, 1);
    };

    render() {

        let message_no_result = '';

        if (this.state.data !== null && this.state.data.length === 0)  {
            message_no_result = <div> Pas de résultats </div>
        }


        return (
            <div>

                <h2> HomePage </h2>

                <Search changeApiDate={this.changeApiDate}/>

                {!this.state.data ? (
                    <ProgressBar />
                ) : (
                    <div>
                        {message_no_result}
                        <List data={this.state.data} />
                    </div>
                )}
            </div>
        );
    }

}

export default HomePage;
