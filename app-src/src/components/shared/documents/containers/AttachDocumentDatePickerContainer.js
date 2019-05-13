import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';
import AttachDocumentDatePicker from '../presentational/AttachDocumentDatePicker';

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
            errorsVisible,
            startRequired,
            endRequired
        } = this.props;
        const startErrorMessage =
            showFieldError || errorsVisible ? startError : null;
        const endErrorMessage =
            showFieldError || errorsVisible ? endError : null;
        return (
            <AttachDocumentDatePicker
                startOn={startOn}
                endOn={endOn}
                startErrorMessage={startErrorMessage}
                endErrorMessage={endErrorMessage}
                onChange={onChange}
                startRequired={startRequired}
                endRequired={endRequired}
            />
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
        const { endError, addFieldError, removeFieldError } = this.props;

        if (startOn && endOn && startOn.getTime() >= endOn.getTime())
            addFieldError('endOn', 'End date must be after start date.');
        else if (endError) removeFieldError('endOn');
    };
}

const mapStateToProps = ({ shared: { fieldErrorsReducer } }) => ({
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
