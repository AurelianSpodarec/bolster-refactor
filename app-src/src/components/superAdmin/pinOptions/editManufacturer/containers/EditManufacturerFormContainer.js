import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editManufacturer from 'actions/superAdmin/manufacturers/async/editManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditManufacturerForm from '../presentational/EditManufacturerForm';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class EditManufacturerFormContainer extends Component {
    state = {
        name: this.props.manufacturer.name,
    };

    render() {
        return (
            <EditManufacturerForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { manufacturers, manufacturer: manufacturerBeingEdited } = this.props;
        const nameTaken = manufacturers.some(
            manufacturer =>
                manufacturer.name === value && manufacturer.id !== manufacturerBeingEdited.id,
        );
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editManufacturer, type, manufacturer } = this.props;

        const postBody = {
            ...manufacturer,
            name: this.state.name,
        };

        editManufacturer(type, postBody);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersReducer: { manufacturers },
        },
    },
    { type },
) => {
    const pinOptionType = DROPDOWN_OPTIONS[type].reduxKey;
    return {
        manufacturers: manufacturers[pinOptionType]
            ? Object.values(manufacturers[pinOptionType])
            : [],
    };
};

const mapDispatchToProps = {
    editManufacturer,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditManufacturerFormContainer),
);
