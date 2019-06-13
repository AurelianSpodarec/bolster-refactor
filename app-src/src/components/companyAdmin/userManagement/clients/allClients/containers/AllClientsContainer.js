import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllClients from '../presentational/AllClientsAdmins';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

export class AllClientsContainer extends Component {
    render() {
        return <AllClients />;
    }

    componentDidMount = () => {
        const { fetchAllCompanyUsers } = this.props;

        fetchAllCompanyUsers();
    };
}

// const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    fetchAllCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AllClientsContainer);
