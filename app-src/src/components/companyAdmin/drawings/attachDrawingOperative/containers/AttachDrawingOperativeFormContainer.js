import React, { Component } from 'react';
import { connect } from 'react-redux';

import AttachOperativesFormContainer from 'components/shared/operatives/containers/AttachOperativesFormContainer';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class AttachDrawingOperativeFormContainer extends Component {
    render() {
        return <AttachOperativesFormContainer hierarchyType="drawing" />;
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
)(AttachDrawingOperativeFormContainer);
