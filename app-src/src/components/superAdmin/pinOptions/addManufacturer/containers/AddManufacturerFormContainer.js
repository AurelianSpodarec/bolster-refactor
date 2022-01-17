import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createManufacturer from 'actions/superAdmin/manufacturers/async/createManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddManufacturerForm from '../presentational/AddManufacturerForm';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

class AddManufacturerFormContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
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
                serviceOptions={this.formatServices()}
            />
        );
    }

    componentDidMount = () => {
        const serviceIDs = this.props.services.map(({ id }) => id);
        this.setState({ serviceIDs });
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    formatServices = () => {
        const { services } = this.props;
        const serviceOptions = services.map(({ name, id }) => {
            return {
                text: name,
                name: name,
                value: id.toString(),
            };
        });
        return serviceOptions;
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
        superAdmin: {
            manufacturersReducer: { manufacturers },
            adminServicesReducer: { adminServices },
        },
    },
    { type },
) => {
    const pinOptionType = DROPDOWN_OPTIONS[type].reduxKey;
    return {
        manufacturers: manufacturers[pinOptionType]
            ? Object.values(manufacturers[pinOptionType])
            : [],
        services: Object.values(adminServices),
    };
};

const mapDispatchToProps = {
    createManufacturer,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddManufacturerFormContainer),
);
