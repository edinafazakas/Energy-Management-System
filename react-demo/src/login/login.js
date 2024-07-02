import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserByUsername } from "../person/api/person-api";
import './style/login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        const loginURL = 'http://localhost:8081/login';


        fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json(); // Parse response as JSON
                } else {
                    throw new Error('Authentication failed');
                }
            })
            .then(data => {
                const { token, role, secretKey, error } = data;

                if (error) {
                    alert('Authentication failed: ' + error);
                    return;
                }

                console.log("secretkey from login: " + secretKey)
                sessionStorage.setItem('userRole', role);
                sessionStorage.setItem('userToken', token);
                sessionStorage.setItem('secretKey', secretKey);

                if (role === 'admin') {
                    alert('Login successful: ' + role);
                    this.props.history.push('/admin/home');
                } else if (role === 'client') {
                    alert('Login successful: ' + role);
                    this.fetchUserDevicesAndRedirect(username, secretKey);
                } else {
                    alert('Invalid user role: ' + role);
                }
            })
            .catch(error => {
                console.error('Error during login fetch:', error);
                alert('Authentication failed. Check console for details.');
            });
    }

    fetchUserDevicesAndRedirect = (username, secretKey) => {
        getUserByUsername(username, (userId) => {
            console.log('Fetched userId:', userId);

            this.setState({ userId });
            const devicesURL = `http://localhost:9091/getDevices`;

            fetch(devicesURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
                    'Secret-Key': sessionStorage.getItem('secretKey'),
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw Error('Failed to fetch user devices');
                    }
                })
                .then(devices => {
                    this.props.history.push({
                        pathname: '/client/device',
                        state: { devices, userId },
                    });

                })
                .catch(error => {
                    console.error('Failed to fetch user devices:', error);
                });
        });
    }

    render() {
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Username"
                        className="login-input"
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        placeholder="Password"
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);
