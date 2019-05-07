import React, { Component } from 'react';
import { connect } from 'react-redux';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import Signature from '../presentational/Signature';

class SignatureContainer extends Component {
    state = {
        showFieldError: false
    };

    render() {
        const { showFieldError } = this.state;
        const { name, error, errorsVisible, canvasProps } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <Signature
                updateRef={ref => (this.sigPad = ref)}
                onEnd={this.handleChange}
                penColor={'black'}
                canvasProps={canvasProps}
                name={name}
                error={errorMessage}
            />
        );
    }

    componentDidMount = () => this._validate('');

    componentDidUpdate = () => {
        const { value } = this.props;

        const val = this.sigPad.toDataURL('image/jpg');
        const oldVal = this.sigPad.fromDataURL(value);

        if (!oldVal && value) this._validate(val);
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = () => {
        const { onChange } = this.props;
        this._validate();
        onChange(this.sigPad.toDataURL('image/jpg'));
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
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignatureContainer);
