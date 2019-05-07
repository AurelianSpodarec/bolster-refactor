import { connect } from 'react-redux';
import React, { Component } from 'react';
import Checkbox from '../presentational/Checkbox';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';

class CheckboxContainer extends Component {
    state = {
        showFieldError: false,
        firstValidated: false
    };
    render() {
        const { showFieldError } = this.state;
        const {
            checked,
            name,
            errorsVisible,
            disabled,
            error,
            id,
            text,
            value,
            classes
        } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <Checkbox
                checked={checked}
                handleChange={this.handleChange}
                name={name}
                id={id}
                error={errorMessage}
                disabled={disabled}
                text={text}
                value={value}
                classes={classes}
            />
        );
    }
    componentDidMount = () => this._validate();

    componentDidUpdate = ({ checked: prevChecked }) => {
        if (this.props.checked !== prevChecked) this._validate();
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = ({ target: { name, checked } }) =>
        this.props.handleChange(name, checked);

    _validate() {
        const {
            required,
            checked,
            addFieldError,
            removeFieldError,
            name,
            error
        } = this.props;
        if (required && !checked) {
            addFieldError(name, 'This is a required field.');
        } else if (error) {
            removeFieldError(name);
        }
    }
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
)(CheckboxContainer);
