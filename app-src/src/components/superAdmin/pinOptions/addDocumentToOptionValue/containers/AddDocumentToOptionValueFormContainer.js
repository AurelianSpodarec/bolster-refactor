import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDocumentForOptionValue from 'actions/superAdmin/manufacturers/async/createDocumentForOptionValue';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import AddDocumentToOptionValueForm from '../presentational/AddDocumentToOptionValueForm';

class AddDocumentToOptionValueFormContainer extends Component {
    state = {
        name: '',
    };

    render() {
        return (
            <AddDocumentToOptionValueForm
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
        const { optionValues } = this.props;
        const nameTaken = optionValues.some(optionValue => optionValue.name === value);
        if (nameTaken) return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createDocumentForOptionValue, optionValue } = this.props;

        const postBody = {
            ...this.state,
        };

        createDocumentForOptionValue(optionValue.id, postBody);
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
    createDocumentForOptionValue,
    hideModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AddDocumentToOptionValueFormContainer),
);
