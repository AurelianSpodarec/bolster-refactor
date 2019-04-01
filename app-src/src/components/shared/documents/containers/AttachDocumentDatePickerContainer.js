import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/generic/fieldErrors/sync/removeFieldError';
import DatePicker from '../../generic/form/presentational/DatePicker';

class AttachDocumentDatePickerContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { showFieldError } = this.state;
        const {
            onChange,
            startDate,
            endDate,
            error,
            errorsVisible
        } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;
        return (
            <div>
                <DatePicker
                    name="Start Date"
                    selected={startDate}
                    onChange={e => onChange(e, 'startDate')}
                />
                <DatePicker
                    name="End Date"
                    selected={endDate}
                    onChange={e => onChange(e, 'endDate')}
                />
                {errorMessage && errorMessage.length && (
                    <p className="error red-text text-accent-4">
                        {errorMessage}
                    </p>
                )}
            </div>
        );
    }

    componentDidMount() {
        const { startDate, endDate } = this.props;
        this._validate(startDate, endDate);
    }

    componentDidUpdate({ startDate: prevStartDate, endDate: prevEndDate }) {
        const { startDate, endDate } = this.props;
        if (startDate !== prevStartDate || endDate !== prevEndDate) {
            this._validate(startDate, endDate);
        }
    }

    componentWillUnmount() {
        const { name, error, removeFieldError } = this.props;
        if (error) removeFieldError(name);
    }

    _validate = (startDate, endDate) => {
        const {
            name,
            error,
            required,
            addFieldError,
            removeFieldError
        } = this.props;

        if (required && !(startDate || endDate)) {
            addFieldError(name, 'This is a required field.');
        } else if (startDate.getTime() > endDate.getTime()) {
            addFieldError(name, 'Start date must be before end date.');
        } else if (error) {
            removeFieldError(name);
        }
    };
}

const mapStateToProps = ({ fieldErrorsReducer }, ownProps) => ({
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
)(AttachDocumentDatePickerContainer);
