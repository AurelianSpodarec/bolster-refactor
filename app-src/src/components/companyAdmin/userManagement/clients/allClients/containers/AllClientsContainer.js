import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllClients from '../presentational/AllClientsAdmins';
import fetchClientUsers from 'actions/companyAdmin/userManagement/async/fetchClientUsers';

export class AllClientsContainer extends Component {
    render() {
        return <AllClients />;
    }

    componentDidMount = () => {
        const { fetchAllClientUsers } = this.props;

        fetchAllClientUsers();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllClientUsers: () => {
        dispatch(fetchClientUsers());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AllClientsContainer);
