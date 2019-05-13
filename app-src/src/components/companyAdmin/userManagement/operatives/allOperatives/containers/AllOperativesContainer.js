import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import AllOperatives from '../presentational/AllOperatives';

export class AllOperativesContainer extends Component {
    render = () => <AllOperatives />;

    componentDidMount = () => this.props.fetchAllCompanyUsers();
}

const mapDispatchToProps = dispatch => ({
    fetchAllCompanyUsers: () => dispatch(fetchCompanyUsers())
});

export default connect(
    null,
    mapDispatchToProps
)(AllOperativesContainer);
