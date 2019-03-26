import React, { Component } from 'react';
import { connect } from 'react-redux';
import editPassword from 'actions/users/async/editPassword';
import { hideModal } from 'actions/generic/modals/sync/hideModal';
import EditUserPasswordModal from '../presentational/EditUserPasswordModal';

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
                hideModal={e => {
                    e.preventDefault();
                    this.props.hideModal();
                }}
            />
        );
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { password } = this.state;
        const { id, editPassword } = this.props;
        editPassword(id, { password });
    };

    validatePassword = confirmPassword => {
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
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditUserPasswordModalContainer);
