import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({ component: Component, requiredRole, ...rest }) => {
    const userRole = sessionStorage.getItem('userRole');

    if (userRole === requiredRole || userRole) {
        return <Route {...rest} render={(props) => <Component {...props} />} />;
    } else {
        return <Redirect to="/error" />;
    }
};

export default ProtectedRoute;
