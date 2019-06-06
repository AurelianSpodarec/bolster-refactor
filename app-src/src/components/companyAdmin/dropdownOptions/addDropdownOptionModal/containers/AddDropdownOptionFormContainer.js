import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import createDropdownOption from 'actions/companyAdmin/dropdownOptions/async/createDropdownOption';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import AddDropdownOptionForm from '../presentational/AddDropdownOptionForm';

class AddDropdownOptionFormContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <AddDropdownOptionForm
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
        const { dropdownOptions } = this.props;
        const existingNames = dropdownOptions.map(({ name }) => name);
        if (existingNames.includes(value))
            return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { createDropdownOption, type } = this.props;

        const postBody = {
            ...this.state
        };

        createDropdownOption(type, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            dropdownOptionsReducer: { dropdownOptions }
        }
    },
    { type }
) => ({
    dropdownOptions: Object.values(dropdownOptions).filter(
        op => op.type === type
    )
});

const mapDispatchToProps = {
    createDropdownOption,
    hideModal
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddDropdownOptionFormContainer)
);
