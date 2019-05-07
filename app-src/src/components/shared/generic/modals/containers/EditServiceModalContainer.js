import React, { Component } from 'react';
import { connect } from 'react-redux';
import editService from 'actions/superAdmin/services/async/editService';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditServiceModal from '../presentational/EditServiceModal';

class EditServiceModalContainer extends Component {
    state = {
        name: this.props.name
    };
    render() {
        return (
            <EditServiceModal
                name={this.state.name}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
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
        const { name } = this.state;
        const { id, editService } = this.props;
        editService(id, name);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    editService: (id, name) => {
        dispatch(editService(id, name));
        dispatch(hideModal());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(EditServiceModalContainer);
