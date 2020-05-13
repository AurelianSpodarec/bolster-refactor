import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createOptionValue from 'actions/superAdmin/manufacturers/async/createOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddOptionValueForm from '../presentational/AddOptionValueForm';

class AddOptionValueFormContainer extends Component {
    state = {
        name: '',
        serviceIDs: [],
    };

    render() {
        const { services } = this.props;

        const serviceOptions = services.map(({ id, name }) => ({
            value: id,
            label: name,
        }));

        return (
            <AddOptionValueForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                buttonText={this.props.buttonText}
                validateName={this.validateName}
                serviceOptions={serviceOptions}
            />
        );
    }

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const { optionValues } = this.props;
        const nameTaken = optionValues.some(optionValue => optionValue.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createOptionValue, manufacturer } = this.props;

        const postBody = {
            ...this.state,
        };

        createOptionValue(manufacturer.id, postBody);
    };
}

const mapStateToProps = (
    {
        superAdmin: {
            manufacturersOptionValuesReducer: { manufacturersOptionValues },
        },
    },
    { manufacturer },
) => {
    return {
        optionValues: manufacturersOptionValues[manufacturer.id]
            ? Object.values(manufacturersOptionValues[manufacturer.id])
            : [],
    };
};

const mapDispatchToProps = {
    createOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddOptionValueFormContainer),
);
