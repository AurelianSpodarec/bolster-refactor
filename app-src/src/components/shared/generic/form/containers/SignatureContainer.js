import React, { Component } from 'react';
import { connect } from 'react-redux';
import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import Signature from '../presentational/Signature';

class SignatureContainer extends Component {
    state = { showFieldError: false, showUploadComponent: false, file: '' };

    render() {
        const { showFieldError, showUploadComponent, file } = this.state;
        const { name, error, errorsVisible, canvasProps } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;

        return (
            <Signature
                updateRef={ref => (this.sigPad = ref)}
                onEnd={this.handleChange}
                handleClear={this.handleClear}
                handleUploadChange={this.handleUploadChange}
                penColor={'black'}
                canvasProps={canvasProps}
                name={name}
                error={errorMessage}
                showUploadComponent={showUploadComponent}
                swtichUploadSig={this._handleSwitchUploadSig}
                file={file}
            />
        );
    }

    componentDidMount = () => this._validate('');

    componentDidUpdate = prevProps => {
        const { value, filesUploading } = this.props;

        const val = this.sigPad.toDataURL('image/jpg');
        const oldVal = this.sigPad.fromDataURL(value);

        if (!oldVal && value) this._validate(val);

        if (prevProps.filesUploading && !filesUploading) {
            this.props.onChange(this.state.file);
        }
    };

    componentWillUnmount = () => {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    };

    handleChange = () => {
        this._validate();
        this.props.onChange(this.sigPad.toDataURL('image/jpg'));
    };
    handleUploadChange = (name, value) => {
        this.setState({ [name]: value });
        this._validate(this.state.file);
        this.props.onChange(this.state.file);
    };

    handleClear = () => this.sigPad.clear();

    _validate = value => {
        const {
            name,
            error,
            required,
            validate = () => {},
            addFieldError,
            removeFieldError,
        } = this.props;

        const validateError = validate(value);

        if (required && this.sigPad.isEmpty() && this.state.file.length < 1) {
            addFieldError(name, 'This is a required field.');
        } else if (validateError && validateError.length) {
            addFieldError(name, validateError);
        } else if (error) {
            removeFieldError(name);
        }
    };

    _handleSwitchUploadSig = () => {
        const { showUploadComponent } = this.state;

        this.handleClear();
        this.setState({ showUploadComponent: !showUploadComponent });
    };
}

const mapStateToProps = (
    {
        shared: {
            fieldErrorsReducer: { fieldErrors, errorsVisible },
            filesUploadingReducer: { filesUploading },
        },
    },
    { name },
) => ({
    error: fieldErrors[name],
    errorsVisible,
    filesUploading,
});

const mapDispatchToProps = { addFieldError, removeFieldError };

export default connect(mapStateToProps, mapDispatchToProps)(SignatureContainer);
