import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import { isEmpty } from 'helpers/generic';

export default function withFieldValidation(WrappedComponent) {
    class WithFieldValidation extends Component {
        state = {
            showError: false
        };

        render() {
            const { showError } = this.state;
            const { error } = this.props;
            return (
                <>
                    <WrappedComponent
                        {...this.props}
                        showError={this.showError}
                        onChange={this.handleChange}
                    />
                    {!!showError && !!error && (
                        <p className="error red-text text-accent-4">{error}</p>
                    )}
                </>
            );
        }

        componentDidMount() {
            const { value } = this.props;
            this._validate(value);
        }

        componentWillUnmount() {
            const { name, removeFieldError, error } = this.props;
            if (error) removeFieldError(name);
        }

        componentDidUpdate({
            value: prevVal,
            showFieldErrors: prevShowErrors
        }) {
            const { value, showFieldErrors } = this.props;
            if (isEmpty(prevVal) && !isEmpty(value)) this._validate(value);
            if (!prevShowErrors && showFieldErrors) this.showError();
        }

        showError = () => {
            const { showError } = this.state;
            if (!showError) this.setState({ showError: true });
        };

        handleChange = (name, value, ...rest) => {
            const { onChange } = this.props;
            this._validate(value);
            onChange(name, value, ...rest);
        };

        _validate = value => {
            const {
                name,
                required,
                error,
                validate = () => {},
                addFieldError,
                removeFieldError
            } = this.props;
            const customError = validate(value);

            if (required && isEmpty(value)) {
                addFieldError(name, 'This is a required field.');
            } else if (customError && customError.length) {
                addFieldError(name, customError);
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
        addFieldError: (name, error) => {
            dispatch(addFieldError(name, error));
        },
        removeFieldError: name => {
            dispatch(removeFieldError(name));
        }
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithFieldValidation);
}
