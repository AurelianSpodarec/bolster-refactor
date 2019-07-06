import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserDrawings from '../presentational/UserDrawings';
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';

class UserDrawingsContainer extends Component {
    render() {
        const { user } = this.props;
        return (
            <UserDrawings
                title={`${this.isOperative() ? 'Operative' : 'Admin'} ${
                    user.userFirstName
                } ${user.userLastName}`}
            />
        );
    }

    isOperative = () => {
        const { location } = this.props;

        return location.pathname.includes('operative') ? true : false;
    };

    componentDidMount = () => {
        const { fetchSingleCompanyUser, id } = this.props;

        fetchSingleCompanyUser(id);
    };
}
const mapStateToProps = (
    { companyAdmin: { companyUsersReducer } },
    {
        match: {
            params: { id }
        }
    }
) => ({
    user: companyUsersReducer.users[id] || {},
    postSuccess: companyUsersReducer.postSuccess,
    error: companyUsersReducer.error,
    isFetching: companyUsersReducer.isFetching,
    id
});
const mapDispatchToProps = {
    fetchSingleCompanyUser
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(UserDrawingsContainer)
);
