import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchCompanySettings from 'actions/companyAdmin/companySettings/async/fetchCompanySettings';
import Settings from '../presentational/Settings';

class SettingsContainer extends Component {
    render() {
        return <Settings onMobile={this.props.onMobile} />;
    }

    componentDidMount = () => {
        this.props.fetchCompanySettings();
    };
}

const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    onMobile
});

const mapDispatchToProps = dispatch => ({
    fetchCompanySettings: () => {
        dispatch(fetchCompanySettings());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContainer);
