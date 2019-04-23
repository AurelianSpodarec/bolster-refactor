import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinSelector from '../presentational/PinSelector';

class PinSelectorContainer extends Component {
    state = {
        pinOptions: {},
        selectedPinOptions: []
    };

    render() {
        const { pinOptions } = this.state;

        const excludedPins = Object.values(pinOptions).filter(
            pinOption => !pinOption.included
        );
        const includedPins = Object.values(pinOptions).filter(
            pinOption => pinOption.included
        );

        return (
            <PinSelector
                excludedPins={excludedPins}
                includedPins={includedPins}
                handlePinClick={this.handlePinClick}
                handleSubmit={this.handleSubmit}
            />
        );
    }

    //onClick a pin
    //on submit, map new array of pins with isIncluded for checked

    handlePinClick = (e, pinID) => {
        const { selectedPinOptions } = this.state;
        e.preventDefault();
        //add pinID to selectedOptions array

        const checkedPins = selectedPinOptions;
        const newCheckedPins = checkedPins.includes(pinID)
            ? checkedPins.filter(val => val !== pinID)
            : [...checkedPins, pinID];

        this.setState({
            selectedPinOptions: newCheckedPins
        });
    };

    handleSubmit = () => {
        const { selectedPinOptions, pinOptions } = this.state;

        const setPinInclude = Object.values(pinOptions).map(
            (pin, { included }) => ({
                ...pin,
                included: selectedPinOptions.includes(pin.value)
                    ? !included
                    : included
            })
        );

        this.setState({ pinOptions: setPinInclude, selectedPinOptions: [] });
    };

    componentDidMount = () => {
        const { pins } = this.props;
        if (pins.length) this._setPinOptions();
    };

    componentDidUpdate = prevProps => {
        const { pins } = this.props;
        if (!Object.values(prevProps.pins).length && pins.length) {
            this._setPinOptions();
        }
    };

    _setPinOptions = () => {
        const { pins } = this.props;
        const pinOptions = pins.reduce(
            (acc, { id, pinCode, status }) => ({
                ...acc,
                [id]: { value: id, text: pinCode, status, included: true }
            }),
            {}
        );

        this.setState({ pinOptions });
    };
}

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: {
            customFilters: { pins }
        }
    }
}) => ({
    pins: Object.values(pins) || []
});

export default connect(mapStateToProps)(PinSelectorContainer);
