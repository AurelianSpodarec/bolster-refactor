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
                handleInputChange={this.handleChange}
                error={errorMessage}
                name={name}
            />
        );
    }

    handleChange = (name, value) => this.props.handleChange(name, value);

    componentDidMount = () => this._validate();

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

        if (!selectedOption) {
            addFieldError(name, 'This is a required field.');
        } else if (error) {
            removeFieldError(name);
        }
    };
}

const mapStateToProps = (
    {
        shared: {
            fieldErrorsReducer: { fieldErrors, errorsVisible }
        }
    },
    { name }
) => ({
    error: fieldErrors[name],
    errorsVisible: errorsVisible
});

const mapDispatchToProps = dispatch => ({
    addFieldError: (name, error) => dispatch(addFieldError(name, error)),
    removeFieldError: name => dispatch(removeFieldError(name))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RadioButtonListContainer);
