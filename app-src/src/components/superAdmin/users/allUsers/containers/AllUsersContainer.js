import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchAllUsers from 'actions/superAdmin/users/async/fetchAllUsers';
import AllUsers from '../presentational/AllUsers';

class AllUsersContainer extends Component {
    render = () => <AllUsers />;

    componentDidMount = () => this.props.fetchAllUsers();
}

const mapDispatchToProps = { fetchAllUsers };

export default connect(
    null,
    mapDispatchToProps
)(AllUsersContainer);
