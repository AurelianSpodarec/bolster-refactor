import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';
import { logout } from 'actions/shared/auth/sync/logout';

const SuperAdminMenuContainer = ({ history, unreadRequests, logout }) => {
    return <SuperAdminMenu unreadRequests={unreadRequests} logout={handleLogout} />;
    function handleLogout(e) {
        e.preventDefault();
        logout();
        history.replace('/auth/login');
    }
};

const mapStateToProps = ({ superAdmin: { contactSubmissionsReducer } }) => ({
    unreadRequests: Object.values(contactSubmissionsReducer.contactSubmissions).reduce(
        (result, { contacted }) => result + (!contacted ? 1 : 0),
        0,
    ),
});

export default withRouter(connect(mapStateToProps, { logout })(SuperAdminMenuContainer));
