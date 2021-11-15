import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SuperAdminMenu from '../presentational/SuperAdminMenu';
import { logout } from 'actions/shared/auth/sync/logout';

const SuperAdminMenuContainer = ({ history, unreadRequests, unreadBugReports, logout }) => {
    return (
        <SuperAdminMenu
            unreadRequests={unreadRequests}
            unreadBugReports={unreadBugReports}
            logout={handleLogout}
        />
    );
    function handleLogout(e) {
        e.preventDefault();
        logout();
        history.replace('/auth/login');
    }
};

const mapStateToProps = ({ superAdmin: { contactSubmissionsReducer, bugReportsReducer } }) => ({
    unreadRequests: Object.values(contactSubmissionsReducer.contactSubmissions).reduce(
        (result, { contacted }) => result + (!contacted ? 1 : 0),
        0,
    ),
    unreadBugReports: Object.values(bugReportsReducer.bugReports).reduce(
        (result, { isRead }) => result + (!isRead ? 1 : 0),
        0,
    ),
});

export default withRouter(connect(mapStateToProps, { logout })(SuperAdminMenuContainer));
