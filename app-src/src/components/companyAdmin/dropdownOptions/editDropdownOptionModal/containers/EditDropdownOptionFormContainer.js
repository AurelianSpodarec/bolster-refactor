import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import editDropdownOption from 'actions/companyAdmin/dropdownOptions/async/editDropdownOption';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import EditDropdownOptionForm from '../presentational/EditDropdownOptionForm';

class EditDropdownOptionContainer extends Component {
    state = {
        name: ''
    };

    render() {
        return (
            <EditDropdownOptionForm
                {...this.state}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
                hideModal={this.props.hideModal}
                validateName={this.validateName}
            />
        );
    }

    componentDidMount = () => {
        const {
            option: { name }
        } = this.props;
        this.setState({
            name
        });
    };

    componentDidUpdate = prevProps => {
        const {
            option: { name, id }
        } = this.props;

        if (!prevProps.option.id && !!id) {
            this.setState({
                name
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateName = value => {
        const {
            dropdownOptions,
            option: { id }
        } = this.props;

        const existingNames = dropdownOptions
            .filter(op => op.id !== id)
            .map(({ name }) => name);

        if (existingNames.includes(value))
            return 'Please choose a unique name.';
    };

    handleSubmit = e => {
        e.preventDefault();
        const {
            editDropdownOption,
            option: { id, type }
        } = this.props;

        const postBody = {
            ...this.state
        };

        editDropdownOption(id, type, postBody);
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            dropdownOptionsReducer: { dropdownOptions }
        }
    },
    { option: { type } }
) => ({
    dropdownOptions: Object.values(dropdownOptions).filter(
        op => op.type === type
    )
});

const mapDispatchToProps = dispatch => ({
    editDropdownOption: (id, type, postBody) => {
        dispatch(editDropdownOption(id, type, postBody));
    },
    hideModal: () => {
        dispatch(hideModal());
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(EditDropdownOptionContainer)
);
