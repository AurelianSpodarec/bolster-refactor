import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';

import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class AttachBuildingOperativeContainer extends Component {
    render() {
        return <AttachOperativesFormContainer hierarchyType="building" />;
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
)(AttachBuildingOperativeContainer);
