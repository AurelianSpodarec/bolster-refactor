import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

class SignatureContainer extends Component {
    state = {
        showFieldError: false
    };

    sigPad = {};

    render() {
        const { showFieldError } = this.state;
        const { name, error, errorsVisible, canvasProps } = this.props;

        let errorMessage;
        if (showFieldError || errorsVisible) errorMessage = error;

        return (
            <>
                <SignatureCanvas
                    onEnd={this.handleChange}
                    penColor={'black'}
                    canvasProps={canvasProps}
                    name={name}
                    ref={ref => {
                        this.sigPad = ref;
                    }}
                />
                {!!(error && error.length) && (
                    <p className="error red-text text-accent-4">
                        {errorMessage}
                    </p>
                )}
            </>
        );
    }

    componentDidMount = () => {
        const val = this.sigPad.toDataURL('image/jpg');
        this._validate(val);
    };

    componentDidUpdate = ({ value: prevValue }) => {
        const val = this.sigPad.toDataURL('image/jpg');
        if (prevValue !== val) this._validate(val);
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = e => {
        this._validate();
        this.props.onChange(this.sigPad.toDataURL('image/jpg'));
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

        if (required && this.sigPad.isEmpty()) {
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
)(SignatureContainer);
