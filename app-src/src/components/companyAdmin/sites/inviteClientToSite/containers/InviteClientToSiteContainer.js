import React, { Component } from 'react';
import { connect } from 'react-redux';

import InviteClientToSiteFormContainer from 'components/shared/clients/containers/InviteClientToSiteFormContainer';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class AttachSiteOperativeContainer extends Component {
    render() {
        return <InviteClientToSiteFormContainer hierarchyType="site" />;
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
