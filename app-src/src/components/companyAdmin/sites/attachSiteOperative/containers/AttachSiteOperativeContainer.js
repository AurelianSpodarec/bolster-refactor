import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/conatiners/AttachOperativesFormContainer';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class AttachSiteOperativeContainer extends Component {
    render() {
        return <AttachOperativesFormContainer />;
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
