import React, { Component } from 'react';
import { connect } from 'react-redux';

import ForgotPasswordModal from '../presentational/ForgotPasswordModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import postForgotPassword from 'actions/shared/auth/async/postForgotPassword';

class ForgotPasswordModalContainer extends Component {
    state = {
        email: ''
    };

    render = () => {
        const { hideModal } = this.props;
        return (
            <ForgotPasswordModal
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message:
                    'Your request has successfully been sent. If your email exists in the system, an email will be sent with instructions to reset your password.'
            });
        }
    };

    handleChange = (name, value) => this.setState({ [name]: value });

    handleSubmit = e => {
        e.preventDefault();
        this.props.postForgotPassword({ ...this.state });
    };
}

const mapStateToProps = ({
    shared: {
        forgotPasswordReducer: { postSuccess, error }
    }
}) => ({
    error,
    postSuccess
});

const mapDispatchToProps = {
    postForgotPassword
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPasswordModalContainer);
