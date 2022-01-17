import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editOptionValue from 'actions/superAdmin/manufacturers/async/editOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import EditOptionValueForm from '../presentational/EditOptionValueForm';

class EditOptionValueFormContainer extends Component {
    state = {
        name: this.props.optionValue.name,
        serviceIDs: this.props.optionValue.serviceIDs || this.props.services.map(({ id }) => id),
    };

    render() {
        return (
            <EditOptionValueForm
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
        const { optionValues, optionValue: optionValueBeingEdited } = this.props;

        const nameTaken = optionValues.some(
            optionValue =>
                optionValue.name === value && optionValue.id !== optionValueBeingEdited.id,
        );
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { editOptionValue, optionValue } = this.props;
        const postBody = {
            ...this.state,
            id: optionValue.id,
        };
        editOptionValue(optionValue.manufacturerID, postBody);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
            manufacturersReducer: { manufacturers },
        },
    },
    { optionValue },
) => {
    return {
        optionValues: manufacturersOptionValues[optionValue.manufacturerID]
            ? Object.values(manufacturersOptionValues[optionValue.manufacturerID])
            : [],
        manufacturers,
    };
};

const mapDispatchToProps = {
    editOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditOptionValueFormContainer),
);
