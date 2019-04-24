import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllUsers from 'actions/superAdmin/users/async/fetchAllUsers';
import AllUsers from '../presentational/AllUsers';

class AllUsersContainer extends Component {
    render() {
        return <AllUsers />;
    }

    componentDidMount() {
        this.props.fetchAllUsers();
    }
}

const mapDispatchToProps = () => dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers())
});
export default connect(
    null,
    mapDispatchToProps
)(AllUsersContainer);
