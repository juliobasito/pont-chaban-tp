import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
    Col,
    Icon,
    Row
} from 'react-materialize';

class Header extends Component {

    render() {

        const prev_id = parseInt(this.props.id, 10) - 1;
        const next_id = parseInt(this.props.id, 10) + 1;

        return (
            <div>

                <Row>
                <Col s={4} className='grid-example'>
                    <Link
                        to="/"
                    >
                        <Icon>home</Icon>
                    </Link>
                </Col>

                <Col s={4} className='grid-example'></Col>


                <Col s={2} className='grid-example'>

                    <Link
                        to={`/${prev_id}`}
                    >
                        <Icon>navigate_before</Icon>
                    </Link>

                    <Link
                        to={`/${next_id}`}
                    >
                        <Icon>navigate_next</Icon>
                    </Link>
                </Col>
                </Row>
            </div>
        );
    }

}

export default Header;
