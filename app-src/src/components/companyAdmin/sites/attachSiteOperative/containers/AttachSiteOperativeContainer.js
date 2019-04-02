import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachSiteOperativeFormContainer from './AttachSiteOperativeFormContainer';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class AttachSiteOperativeContainer extends Component {
    render() {
        return <AttachSiteOperativeFormContainer />;
    }

    componentDidMount = () => {
        const { fetchAllCompanyUsers } = this.props;

        fetchAllCompanyUsers();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchAllCompanyUsers: () => {
        dispatch(fetchCompanyUsers());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(AttachSiteOperativeContainer);
