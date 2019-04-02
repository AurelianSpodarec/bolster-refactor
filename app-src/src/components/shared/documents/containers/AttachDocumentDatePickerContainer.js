import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import DatePicker from '../../generic/form/presentational/DatePicker';
import Field from 'components/shared/generic/form/presentational/Field';

class AttachDocumentDatePickerContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { showFieldError } = this.state;
        const {
            onChange,
            startOn,
            endOn,
            startError,
            endError,
            errorsVisible
        } = this.props;
        const startErrorMessage =
            showFieldError || errorsVisible ? startError : null;
        const endErrorMessage =
            showFieldError || errorsVisible ? endError : null;
        return (
            <>
                <Field name="Start date">
                    <DatePicker
                        name="Start Date"
                        selected={startOn}
                        onChange={e => onChange(e, 'startOn')}
                    />
                </Field>
                {startErrorMessage && startErrorMessage.length && (
                    <p className="error red-text text-accent-4">
                        {startErrorMessage}
                    </p>
                )}
                <Field name="End date">
                    <DatePicker
                        name="End Date"
                        selected={endOn}
                        onChange={e => onChange(e, 'endOn')}
                    />
                    {endErrorMessage && endErrorMessage.length && (
                        <p className="error red-text text-accent-4">
                            {endErrorMessage}
                        </p>
                    )}
                </Field>
            </>
        );
    }

    componentDidMount() {
        const { startOn, endOn } = this.props;
        this._validate(startOn, endOn);
    }

    componentDidUpdate({ startOn: prevstartOn, endOn: prevendOn }) {
        const { startOn, endOn } = this.props;
        if (startOn !== prevstartOn || endOn !== prevendOn) {
            this._validate(startOn, endOn);
        }
    }

    componentWillUnmount() {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    }

    _validate = (startOn, endOn) => {
        const {
            name,
            startError,
            endError,
            required,
            addFieldError,
            removeFieldError
        } = this.props;

        if (required && !(startOn || endOn)) {
            addFieldError(name, 'This is a required field.');
        } else if (startOn.getTime() > endOn.getTime()) {
            addFieldError(name, 'Start date must be before end date.');
        } else {
            if (startError) {
                removeFieldError('startOn');
            }
            if (endError) {
                removeFieldError('endOn');
            }
        }
    };
}

const mapStateToProps = ({ fieldErrorsReducer }) => ({
    startError: fieldErrorsReducer.fieldErrors['startOn'],
    endError: fieldErrorsReducer.fieldErrors['endOn'],
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
)(AttachDocumentDatePickerContainer);
