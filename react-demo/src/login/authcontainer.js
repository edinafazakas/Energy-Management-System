// AuthContainer.js
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Login from './Login'; // Create a Login component

class AuthContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            role: null,
        };
    }

    handleLogin = (role) => {
        this.setState({
            isLoggedIn: true,
            role: role,
        });
    }

    handleLogout = () => {
        this.setState({
            isLoggedIn: false,
            role: null,
        });
    }

    render() {
        const { isLoggedIn, role } = this.state;

        return (
            <div>
                {isLoggedIn ? (
                    <Redirect to={role === 'admin' ? '/home' : '/home1'} />
                ) : (
                    <Login onLogin={this.handleLogin} />
                )}
            </div>
        );
    }
}

export default withRouter(AuthContainer);
