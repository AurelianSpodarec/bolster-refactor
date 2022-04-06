import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editManufacturer from 'actions/superAdmin/manufacturers/async/editManufacturer';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditManufacturerForm from '../presentational/EditManufacturerForm';
import { PIN_OPTION_TYPES } from 'constants/companyAdmin/enums';

class EditManufacturerFormContainer extends Component {
    state = {
        name: this.props.manufacturer.name,
        serviceIDs: [],
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
                serviceOptions={this.formatServices()}
            />
        );
    }

    componentDidMount = () => {
        const {
            manufacturer: { serviceIDs },
        } = this.props;
        const allServiceIDs = this.formatServices().map(({ value }) => value);
        const stringifiedServiceIDs = serviceIDs?.map(id => id.toString());

        this.setState({ serviceIDs: serviceIDs !== null ? stringifiedServiceIDs : allServiceIDs });
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
            serviceIDs: this.state.serviceIDs,
        };

        editManufacturer(type, postBody);
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
    const pinOptionType = PIN_OPTION_TYPES[type].reduxKey;
    return {
        manufacturers: manufacturers[pinOptionType]
            ? Object.values(manufacturers[pinOptionType])
            : [],
        services: Object.values(adminServices),
    };
};

const mapDispatchToProps = {
    editManufacturer,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditManufacturerFormContainer),
);
