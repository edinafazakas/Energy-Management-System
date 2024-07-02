import React from 'react';
import BackgroundImg from '../commons/images/connectivity-crop.jpg';
import { Button, Container, Jumbotron } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import MyDeviceContainer from '../mydevices/mydevice-container';
import NavigationBar2 from '../navigation-bar2';

const backgroundStyle = {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '1920px',
    backgroundImage: `url(${BackgroundImg})`,
};

const textStyle = { color: 'white' };

class Home1 extends React.Component {
    render() {
        // Extract userId from the props
        const { userId } = this.props.location.state || {};

        return (
            <div>
                <Jumbotron fluid style={backgroundStyle}>
                    <Container fluid>
                        <h1 className="display-3" style={textStyle}>
                            Energy Management System
                        </h1>
                        <p className="lead" style={textStyle}>
                            <b>Enabling managing smart energy metering devices.</b>
                        </p>
                        <hr className="my-2" />
                        <p style={textStyle}>
                            <b>
                                This assignment represents the first module of the distributed
                                software system for Energy Management that represents the final
                                project for the Distributed Systems course.
                            </b>
                        </p>
                        <p className="lead">
                            <Button
                                color="primary"
                                onClick={() =>
                                    window.open('http://coned.utcluj.ro/~salomie/DS_Lic/')
                                }
                            >
                                Learn More
                            </Button>
                        </p>

                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default withRouter(Home1);
