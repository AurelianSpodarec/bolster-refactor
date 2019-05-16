import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import Dropdown from '../presentational/Dropdown';
import { EMAIL_REGEX } from 'helpers/regex';
import { isObjEmpty } from 'helpers/generic';

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
        const { value = {} } = this.props;
        this._validate(value);
    };

    componentDidUpdate = ({ value: prevValue = {} }) => {
        const { value = {} } = this.props;
        if (value.value !== prevValue.value) {
            this._validate(value);
        }
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = ({ target: { name, value } }) => {
        this.props.handleChange(name, value);
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
        if (
            required &&
            !(value && (value.length || value > 0 || !isObjEmpty(value)))
        ) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    _valdateEmail = value => EMAIL_REGEX.test(value);
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
