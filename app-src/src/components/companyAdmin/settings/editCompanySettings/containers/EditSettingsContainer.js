import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import EditSettings from '../presentational/EditSettings';

class EditSettingsContainer extends Component {
    render = () => <EditSettings />;

    componentDidMount = () => {
        this.props.fetchCompanySettings();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditSettingsContainer);
