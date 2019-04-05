import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditCompanyAdmin from '../presentational/EditCompanyAdmin';
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';

class EditCompanyAdminFormContainer extends Component {
    render = () => <EditCompanyAdmin />;

    componentDidMount() {
        this.props.fetchSingleCompanyUser();
    }
}

const mapDispatchToProps = (dispatch, { match: { params } }) => ({
    fetchSingleCompanyUser: () => dispatch(fetchSingleCompanyUser(params.id))
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditCompanyAdminFormContainer)
);
