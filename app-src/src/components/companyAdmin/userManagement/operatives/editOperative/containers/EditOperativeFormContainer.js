import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditOperative from '../presentational/EditOperative';
import fetchSingleCompanyUser from 'actions/companyAdmin/userManagement/async/fetchSingleCompanyUser';

class EditOperativeFormContainer extends Component {
    render() {
        return <EditOperative />;
    }

    componentDidMount() {
        const { id } = this.props.match.params.id;
        this.props.fetchSingleCompanyUser(id);
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCompanyUser: id => {
        dispatch(fetchSingleCompanyUser(id));
    }
});

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(EditOperativeFormContainer)
);
