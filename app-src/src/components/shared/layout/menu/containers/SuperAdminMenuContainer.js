import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';
import { logout } from 'actions/shared/auth/sync/logout';

let SuperAdminMenuContainer = ({ history, logout }) => {
    return <SuperAdminMenu logout={handleLogout} />;
    function handleLogout(e) {
        e.preventDefault();
        logout();
        history.replace('/auth/login');
    }
};

export default withRouter(
    connect(
        null,
        { logout }
    )(SuperAdminMenuContainer)
);
