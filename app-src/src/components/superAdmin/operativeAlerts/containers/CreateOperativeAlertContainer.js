import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateOperativeAlert from '../presentational/CreateOperativeAlert';
import adminCreateOperativeAlert from 'actions/superAdmin/operativeAlerts/async/AdminCreateOperativeAlert';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class CreateOperativeAlertContainer extends Component {
    state = { message: '', sending: false };

    render = () => (
        <CreateOperativeAlert
            message={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            sending={this.state.sending}
        />
    );

    componentDidUpdate = prevProps => {
        const { postSuccess, error, history } = this.props;
        if (postSuccess && !prevProps.postSuccess) {
            history.push('/admin/operative-alerts');
        }
        if (error && !prevProps.error) {
            //  todo handle error
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = () => {
        const { message, sending } = this.state;
        if (!sending) {
            this.setState({ sending: true });
            const { adminCreateOperativeAlert } = this.props;

            const postBody = { message };

            adminCreateOperativeAlert(postBody);
        }
    };
}

const mapStateToProps = ({
    superAdmin: {
        operativeAlertsReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = { adminCreateOperativeAlert, showModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateOperativeAlertContainer)
);
