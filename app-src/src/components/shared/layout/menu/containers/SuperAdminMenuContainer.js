import React from 'react';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';

const SuperAdminMenuContainer = ({ history }) => {
    return <SuperAdminMenu logout={logout} />;
    function logout(e) {
        e.preventDefault();
        localStorage.setItem('token', '');
        history.replace('/auth/login');
    }
};

export default withRouter(SuperAdminMenuContainer);
