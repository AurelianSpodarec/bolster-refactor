import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllUsers from '../presentational/AllUsers';
import fetchUsersBySearch from 'actions/superAdmin/users/async/fetchUsersBySearch';

class AllUsersContainer extends Component {
    render = () => <AllUsers />;

    componentDidMount = () => {
        const { fetchUsersBySearch } = this.props;
        fetchUsersBySearch(1);
    };
}

const mapDispatchToProps = { fetchUsersBySearch };

export default connect(null, mapDispatchToProps)(AllUsersContainer);
