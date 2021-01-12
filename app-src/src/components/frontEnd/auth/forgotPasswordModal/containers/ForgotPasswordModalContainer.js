import React, { Component } from 'react';
import { connect } from 'react-redux';

import ForgotPasswordModal from '../presentational/ForgotPasswordModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import postForgotPassword from 'actions/shared/auth/async/postForgotPassword';

class ForgotPasswordModalContainer extends Component {
    state = {
        email: '',
    };

    render = () => {
        const { hideModal, isPosting } = this.props;
        return (
            <ForgotPasswordModal
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                hideModal={e => {
                    e.preventDefault();
                    hideModal();
                }}
                isPosting={isPosting}
            />
        );
    };

    componentDidUpdate = prevProps => {
        const { postSuccess, showModal, isPosting, error } = this.props;

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message:
                    'Your request has successfully been sent. If your email exists in the system, an email will be sent with instructions to reset your password.',
            });
        }

        if (prevProps.isPosting && !isPosting && error) {
            showModal(ERROR_MODAL, {
                message:
                    'There was an error with your request. It may be that the submitted account does not exist.',
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
        forgotPasswordReducer: { postSuccess, error, isPosting },
    },
}) => ({
    error,
    postSuccess,
    isPosting,
});

const mapDispatchToProps = {
    postForgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordModalContainer);
