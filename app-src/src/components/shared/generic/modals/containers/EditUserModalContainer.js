import React, { Component } from 'react';
import { hideModal } from 'actions/generic/modals/sync/hideModal';
import editUser from 'actions/users/async/editUser';
import { connect } from 'react-redux';
import EditUserModal from '../presentational/EditUserModal';

class EditUserModalContainer extends Component {
    state = {
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        email: this.props.email,
        phoneNumber: this.props.phoneNumber
    };
    render() {
        return (
            <EditUserModal
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
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
        const { firstName, lastName, email, phoneNumber } = this.state;
        const { id, editUser } = this.props;
        editUser(id, { firstName, lastName, email, phoneNumber });
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    editUser: (id, user) => {
        dispatch(editUser(id, user));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditUserModalContainer);
