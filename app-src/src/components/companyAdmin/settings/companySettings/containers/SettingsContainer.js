import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import Settings from '../presentational/Settings';

class SettingsContainer extends Component {
    render() {
        return <Settings />;
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(SettingsContainer);
