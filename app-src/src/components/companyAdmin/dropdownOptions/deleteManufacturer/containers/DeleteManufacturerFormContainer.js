import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import deleteManufacturer from 'actions/companyAdmin/manufacturers/async/deleteManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import DeleteManufacturerForm from '../presentational/DeleteManufacturerForm';

class DeleteManufacturerFormContainer extends Component {
    render() {
        return (
            <DeleteManufacturerForm
                {...this.state}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
            />
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        deleteManufacturer(this.props.id);
    };
}

const mapDispatchToProps = {
    deleteManufacturer,
    hideModal,
};

export default withRouter(connect(null, mapDispatchToProps)(DeleteManufacturerFormContainer));
