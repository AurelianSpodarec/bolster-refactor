import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import TextInput from '../presentational/TextInput';

class NumberInputContainer extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const {
            value,
            name,
            type = 'number',
            placeholder,
            classes = '',
            error,
            errorsVisible,
            maxNum
        } = this.props;

        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <TextInput
                value={value || ''}
                name={name}
                classes={classes}
                type={type}
                placeholder={placeholder}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                error={errorMessage}
                maxNum={maxNum}
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

    handleChange = ({ target: { name, value } }) =>
        this.props.handleChange(name, value);

    handleBlur = () => this.setState({ showFieldError: true });

    _validate = value => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError,
            maxNum
        } = this.props;

        if (required && !value) {
            addFieldError(name, 'This is a required field.');
        } else if (required && maxNum && value > maxNum) {
            addFieldError(
                name,
                `The maximum value for this field is ${maxNum}`
            );
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
)(NumberInputContainer);
