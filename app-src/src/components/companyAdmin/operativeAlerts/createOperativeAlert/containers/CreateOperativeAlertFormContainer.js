import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CreateOperativeAlertForm from '../presentational/CreateOperativeAlertForm';
import createOperativeAlert from 'actions/companyAdmin/operativeAlerts/async/createOperativeAlert';

class CreateOperativeAlertContainer extends Component {
    state = {
        message: ''
    };

    render() {
        return (
            <CreateOperativeAlertForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    componentDidUpdate = prevProps => {
        const { postSuccess, history } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            history.push('/company/message-centre');
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();

        const postBody = {
            ...this.state
        };

        this.props.createOperativeAlert(postBody);
    };
}

const mapStateToProps = ({
    companyAdmin: {
        operativeAlertsReducer: { postSuccess }
    }
}) => ({
    postSuccess
});

const mapDispatchToProps = dispatch => ({
    createOperativeAlert: postBody => {
        dispatch(createOperativeAlert(postBody));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(CreateOperativeAlertContainer)
);
