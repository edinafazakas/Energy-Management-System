import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavigationBar from "./navigation-bar";
import NavigationBar2 from "./navigation-bar2";
import ProtectedRoute from "./protected-route";
import DeviceContainer from "./device/device-container";
import PersonContainer from "./person/person-container";
import UserDeviceContainer from "./userDevices/userDevice-container";
import ErrorPage from "./commons/errorhandling/error-page";
import Home1 from "./home/home1.js";
import Login from "./login/login";
import styles from './commons/styles/project-style.css';
import Home from "./home/home.js";
import EnergyConsumption from "./energyConsumption";
import ChatComponent from "./ChatComponent";
import deviceContainer from "./device/device-container";
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        };
    }

    render() {
        const userRole = sessionStorage.getItem('userRole');

        return (
            <div className={styles.back}>
                <Router>
                    <div>
                        {userRole === 'admin' && (
                            <Route path="/admin" render={() => <NavigationBar />} />
                        )}

                        {userRole === 'client' && (
                            <Route path="/client" render={() => <NavigationBar2 />} />
                        )}

                        <Switch>
                            <Route exact path='/' render={() => <Login />} />

                            {userRole === 'admin' ? (
                                <Redirect from="/client" to="/error" />
                            ) : null}

                            {userRole === 'client' ? (
                                <Redirect from="/admin" to="/error" />
                            ) : null}

                            <ProtectedRoute exact path="/admin/chat" component={ChatComponent} requiredRole="admin" />
                            <ProtectedRoute exact path="/client/chat" component={ChatComponent} requiredRole="client" />
                            <ProtectedRoute exact path="/admin/home" component={Home} requiredRole="admin" />
                            <ProtectedRoute exact path="/admin/device" component={DeviceContainer} requiredRole="admin" />
                            <ProtectedRoute exact path="/admin/users" component={PersonContainer} requiredRole="admin" />
                            <ProtectedRoute exact path="/admin/userdevices" component={UserDeviceContainer} requiredRole="admin" />
                            <ProtectedRoute exact path="/client/home1" component={Home1} requiredRole="client" />
                            <ProtectedRoute exact path="/client/device" component={deviceContainer} requiredRole="client" />


                            <Route exact path='/client/energyConsumption' render={() => <EnergyConsumption />} />
                            <Route exact path='/admin/users' render={() => <PersonContainer />} />
                            <Route exact path='/admin/device' render={() => <DeviceContainer />} />
                            <Route exact path='/admin/userdevices' render={() => <UserDeviceContainer />} />
                            <Route exact path='/client/device' render={() => <DeviceContainer />} />
                            <Route exact path='/client/chat' render={() => <ChatComponent />} />


                            <Route exact path='/error' render={() => <ErrorPage />} />
                            <Route render={() => <Redirect to="/error" />} />
                        </Switch>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
