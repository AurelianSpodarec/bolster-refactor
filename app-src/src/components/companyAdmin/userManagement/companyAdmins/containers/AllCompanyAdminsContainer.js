import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllCompanyAdmins from '../presentational/AllCompanyAdmins';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

export class AllCompanyAdminsContainer extends Component {
    render() {
        return <AllCompanyAdmins />;
    }

    componentDidMount = () => {
        const { fetchAllCompanyUsers } = this.props;

        fetchAllCompanyUsers();

        console.log('hiiiiiii');
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
)(AllCompanyAdminsContainer);
