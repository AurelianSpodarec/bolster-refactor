import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import AllOperatives from '../presentational/AllOperatives';

export class AllOperativesContainer extends Component {
    render() {
        return <AllOperatives />;
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
)(AllOperativesContainer);
