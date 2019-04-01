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
        const { onChange, startOn, endOn, error, errorsVisible } = this.props;
        const errorMessage = showFieldError || errorsVisible ? error : null;
        return (
            <div>
                <DatePicker
                    name="Start Date"
                    selected={startOn}
                    onChange={e => onChange(e, 'startOn')}
                />
                <DatePicker
                    name="End Date"
                    selected={endOn}
                    onChange={e => onChange(e, 'endOn')}
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
            error,
            required,
            addFieldError,
            removeFieldError
        } = this.props;

        if (required && !(startOn || endOn)) {
            addFieldError(name, 'This is a required field.');
        } else if (startOn.getTime() > endOn.getTime()) {
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
