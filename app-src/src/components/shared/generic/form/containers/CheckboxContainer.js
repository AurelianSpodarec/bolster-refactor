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
            item,
            checked,
            handleChange,
            name,
            errorsVisible,
            error
        } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <Checkbox
                item={item}
                checked={checked}
                handleChange={handleChange}
                name={name}
                error={errorMessage}
            />
        );
    }
    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = ({ checked: prevChecked }) => {
        if (this.props.checked !== prevChecked) this._validate();
    };
    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

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
    addFieldError: (fieldName, error) => {
        dispatch(addFieldError(fieldName, error));
    },
    removeFieldError: fieldName => {
        dispatch(removeFieldError(fieldName));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckboxContainer);
