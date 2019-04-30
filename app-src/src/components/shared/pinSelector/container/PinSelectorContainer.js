import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinSelector from '../presentational/PinSelector';
import updateSelectedPins from 'actions/companyAdmin/reports/sync/updateSelectedPins';

class PinSelectorContainer extends Component {
    state = {
        pinOptions: {},
        selectedPinOptions: []
    };

    render() {
        const pinOptions = Object.values(this.state.pinOptions);

        const excludedPins = pinOptions.filter(({ included }) => !included);
        const includedPins = pinOptions.filter(({ included }) => included);

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
        const { updateSelectedPins } = this.props;
        const setPinInclude = Object.values(pinOptions).map(
            ({ included, ...pin }) => ({
                ...pin,
                included: selectedPinOptions.includes(pin.value)
                    ? !included
                    : included
            })
        );
        const selectedPinIDs = setPinInclude.filter(({ included }) => included);
        updateSelectedPins(selectedPinIDs);

        this.setState({ pinOptions: setPinInclude, selectedPinOptions: [] });
    };

    componentDidMount = () => {
        const { pins, updateSelectedPins } = this.props;
        if (pins.length) this._setPinOptions();
        const selectedPinIDs = pins.map(({ id }) => id);
        updateSelectedPins(selectedPinIDs);
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
            customFilters: { pins = {} }
        }
    }
}) => ({
    pins: Object.values(pins)
});

const mapDispatchToProps = dispatch => ({
    updateSelectedPins: pins => dispatch(updateSelectedPins(pins))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinSelectorContainer);
