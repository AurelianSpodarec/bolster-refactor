import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import EditSettings from '../presentational/EditSettings';
import fetchTimezones from 'actions/shared/time/async/fetchTimezones';
import fetchDateFormats from 'actions/shared/time/async/fetchDateFormats';

class EditSettingsContainer extends Component {
    render = () => <EditSettings />;

    componentDidMount = () => {
        this.props.fetchCompanySettings();
    };
}

const mapDispatchToProps = dispatch => ({
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
        dispatch(fetchTimezones());
        dispatch(fetchDateFormats());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditSettingsContainer);
