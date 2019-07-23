import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateOperativeAlert from '../presentational/CreateOperativeAlert';
import adminCreateOperativeAlert from 'actions/superAdmin/operativeAlerts/async/AdminCreateOperativeAlert';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class CreateOperativeAlertContainer extends Component {
    state = { message: '' };

    render = () => (
        <CreateOperativeAlert
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
        />
    );

    componentDidUpdate = prevProps => {
        const { postSuccess, error } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            // todo handle success
        }
        if (error && !prevProps.error) {
            //  todo handle error
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { message } = this.state;
        const { adminCreateOperativeAlert } = this.props;

        const postBody = { message };

        adminCreateOperativeAlert(postBody);
    };
}

const mapDispatchToProps = { adminCreateOperativeAlert, showModal };

export default connect(
    null,
    mapDispatchToProps
)(CreateOperativeAlertContainer);
