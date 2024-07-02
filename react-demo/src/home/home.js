import React from 'react';

import BackgroundImg from '../commons/images/connectivity-crop.jpg';

import {Button, Container, Jumbotron} from 'reactstrap';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: "100%",
    height: "1920px",
    backgroundImage: `url(${BackgroundImg})`
};
const textStyle = {color: 'white', };

class Home extends React.Component {


    render() {

        return (

            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>Energy Management System</h1>
                        <p className="lead" style={textStyle}> <b>Enabling managing smart energy metering devices.</b> </p>
                        <hr className="my-2"/>
                        <p  style={textStyle}> <b>This assignment represents the first module of the distributed software system for Energy Management that represents the final project
                            for the Distributed Systems course. </b> </p>
                        <p className="lead">
                            <Button color="primary" onClick={() => window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')}>Learn
                                More</Button>
                        </p>
                    </Container>
                </Jumbotron>

            </div>
        )
    };
}

export default Home
