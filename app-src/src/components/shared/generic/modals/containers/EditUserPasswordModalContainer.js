import React, { Component } from 'react';
import { connect } from 'react-redux';
import editPassword from 'actions/superAdmin/users/async/editPassword';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditUserPasswordModal from '../presentational/EditUserPasswordModal';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class EditUserPasswordModalContainer extends Component {
    state = {
        password: '',
        confirmPassword: ''
    };
    render() {
        return (
            <EditUserPasswordModal
                password={this.state.password}
                confirmPassword={this.state.confirmPassword}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                validatePassword={this.validatePassword}
                validateConfirmPassword={this.validateConfirmPassword}
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
            />
        );
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id, editPassword } = this.props;
        editPassword(id, { password });
    };

    validatePassword = password => {
        const { confirmPassword } = this.state;
        const { addFieldError, removeFieldError } = this.props;
        if (password !== confirmPassword) {
            addFieldError('confirmPassword', 'Passwords do not match');
        } else {
            removeFieldError('confirmPassword');
        }
        return null;
    };

    validateConfirmPassword = confirmPassword => {
        const { password } = this.state;
        if (password !== confirmPassword) {
            return 'Password and Confirm Password do not match';
        }
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    editPassword: (id, password) => {
        dispatch(editPassword(id, password));
        dispatch(hideModal());
    },
    addFieldError: (field, err) => dispatch(addFieldError(field, err)),
    removeFieldError: field => dispatch(removeFieldError(field))
});

export default connect(
    null,
    mapDispatchToProps
)(EditUserPasswordModalContainer);
