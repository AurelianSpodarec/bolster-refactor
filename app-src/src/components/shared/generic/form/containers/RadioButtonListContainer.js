import React, { Component } from 'react';
import { connect } from 'react-redux';

import addFieldError from 'actions/shared/generic/fieldErrors/sync/addFieldError';
import removeFieldError from 'actions/shared/generic/fieldErrors/sync/removeFieldError';

import RadioButtonList from '../presentational/RadioButtonList';

class RadioButtonListContainer extends Component {
    state = {
        showFieldError: false
    };
    render() {
        const { showFieldError } = this.state;
        const {
            options,
            handleChange,
            error,
            errorsVisible,
            selectedOption,
            name
        } = this.props;
        let errorMessage;

        if (showFieldError || errorsVisible) errorMessage = error;
        return (
            <RadioButtonList
                selectedOption={selectedOption}
                options={options}
                handleInputChange={handleChange}
                error={errorMessage}
                name={name}
            />
        );
    }

    componentDidMount = () => {
        this._validate();
    };

    componentDidUpdate = ({ selectedOption: prevCheckedValue }) => {
        const { selectedOption } = this.props;
        const { showFieldError } = this.state;
        if (!prevCheckedValue && selectedOption) {
            this._validate();

            if (!showFieldError) this.setState({ showFieldError: true });
        }
    };

    _validate = () => {
        const {
            name,
            error,
            addFieldError,
            removeFieldError,
            selectedOption
        } = this.props;

        console.log(selectedOption);

        if (!selectedOption) {
            addFieldError(name, 'This is a required field.');
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
)(RadioButtonListContainer);
