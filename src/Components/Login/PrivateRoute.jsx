import React from 'react'
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const PrivateRoute = ({children}) => {
    const cookies = new Cookies();
    const authToken = cookies.get('response');
    return authToken ? children : <Navigate to="/" />;
}
export default PrivateRoute;