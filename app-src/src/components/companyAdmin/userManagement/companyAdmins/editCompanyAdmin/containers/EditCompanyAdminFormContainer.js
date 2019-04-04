import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditCompanyAdmin from '../presentational/EditCompanyAdmin';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';

class EditCompanyAdminFormContainer extends Component {
    render = () => <EditCompanyAdmin />;
    componentDidMount() {
        // ! should be a fetch single user?
        this.props.fetchCompanyUsers();
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyUsers: () => dispatch(fetchCompanyUsers())
});

export default connect(
    null,
    mapDispatchToProps
)(EditCompanyAdminFormContainer);
