import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import MultiMultiDropdown from '../presentational/MultiMultiDropdown';

class MultiSelectDropdown extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const { options, error, errorsVisible, value = [] } = this.props;

        const errorMessage = showFieldError || errorsVisible ? error : null;

        const defaultDropDown = value.map(curValue => ({
            label: options.find(opt => opt.value === curValue).label,
            value: curValue
        }));

        return (
            <MultiMultiDropdown
                options={options}
                handleChange={this.handleChange}
                error={errorMessage}
                value={defaultDropDown}
            />
        );
    }

    componentDidMount = () => this._validate(this.props.value);

    componentDidUpdate = ({ value: prevValue }) => {
        const { value } = this.props;
        if (prevValue !== value) this._validate(value);
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = updatedValues => {
        this.props.handleChange(updatedValues);
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

        if (required && !(value && value.length)) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) removeFieldError(name);
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
)(MultiSelectDropdown);
