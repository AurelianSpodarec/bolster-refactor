import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
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

        const setPinInclude = Object.values(pinOptions)
            .filter(pin => selectedPinOptions.includes(pin.value))
            .map((pin, { included }) => ({
                ...pin,
                included: !included
            }));

        this.setState({ pinOptions: setPinInclude });
    };

    componentDidMount = () => {
        const { fetchPins, pins } = this.props;

        // if (pins.length) this._setPinOptions();
        fetchPins();
    };

    componentDidUpdate = prevProps => {
        const { pins } = this.props;

        const { pinOptions, selectedPinOptions } = this.state;

        if (!Object.values(prevProps.pins).length && pins.length) {
            this._setPinOptions();
        }
    };

    _setPinOptions = () => {
        const { pins } = this.props;
        const pinOptions = pins.reduce(
            (acc, { id, pinCode }) => ({
                ...acc,
                [id]: { value: id, text: pinCode, included: false }
            }),
            {}
        );

        this.setState({ pinOptions });
    };
}

//need to fetch different pins for each level is chosen
const mapDispatchToProps = dispatch => ({
    fetchPins: () => {
        dispatch(fetchPins('drawing', 8));
    }
});

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins }
    }
}) => ({
    pins: Object.values(pins) || []
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinSelectorContainer);
