import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createManufacturer from 'actions/companyAdmin/manufacturers/async/createManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddManufacturerForm from '../presentational/AddManufacturerForm';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class AddManufacturerFormContainer extends Component {
    state = {
        name: '',
    };

    render() {
        return (
            <AddManufacturerForm
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
        const { manufacturers } = this.props;
        const nameTaken = manufacturers.some(manufacturer => manufacturer.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createManufacturer, type } = this.props;

        const postBody = {
            ...this.state,
            pinOptionType: type,
        };

        createManufacturer(type, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
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
    createManufacturer,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddManufacturerFormContainer),
);
