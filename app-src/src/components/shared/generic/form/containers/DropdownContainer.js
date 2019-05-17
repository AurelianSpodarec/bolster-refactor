import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import Dropdown from '../presentational/Dropdown';

class DropdownContainer extends Component {
    state = { showFieldError: false };
    render() {
        const {
            name,
            options,
            error,
            disabled = false,
            required = false,
            classes = '',
            value,
            selectedOption
        } = this.props;

        const { showFieldError } = this.state;

        return (
            <Dropdown
                name={name}
                options={options}
                selectedOption={
                    value ? value : selectedOption ? selectedOption : {}
                }
                handleChange={this.handleChange}
                handleFocus={this.handleFocus}
                handleBlur={this.handleBlur}
                error={showFieldError ? error : null}
                disabled={disabled}
                required={required}
                classes={classes}
            />
        );
    }

    componentDidMount = () => {
        const { selectedOption } = this.props;
        this._validate(selectedOption);
    };

    componentDidUpdate = ({ selectedOption: prevValue }) => {
        const { selectedOption } = this.props;
        if (selectedOption !== prevValue) {
            this._validate(selectedOption);
        }
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = (name, value) => {
        this.props.handleChange(name, value);
        this._showFieldError();
    };

    handleBlur = () => this._showFieldError();

    _showFieldError = () => {
        if (!this.state.showFieldError) this.setState({ showFieldError: true });
    };

    _validate = value => {
        const {
            name,
            error,
            required,
            validate = () => {},
            addFieldError,
            removeFieldError
        } = this.props;
        const validateError = validate(value);
        if (required && !value) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };
}

const mapStateToProps = ({ shared: { fieldErrorsReducer } }, ownProps) => ({
    error: fieldErrorsReducer.fieldErrors[ownProps.name],
    errorsVisible: fieldErrorsReducer.errorsVisible
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownContainer);
