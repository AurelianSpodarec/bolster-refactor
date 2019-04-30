import React, { Component } from 'react';

import PinSelector from '../presentational/PinSelector';
import withUpdateOnChange from 'components/companyAdmin/reports/allReports/components/hocs/withUpdateOnChange';

class PinSelectorContainer extends Component {
    state = {
        pinOptions: {},
        selectedPinOptions: []
    };

    render() {
        const pinOptions = Object.values(this.state.pinOptions);
        const { includedPins, excludedPins } = pinOptions.reduce(
            (acc, curr) => {
                acc[curr.included ? 'includedPins' : 'excludedPins'].push(curr);
                return acc;
            },
            { includedPins: [], excludedPins: [] }
        );
        return (
            <PinSelector
                excludedPins={excludedPins}
                includedPins={includedPins}
                handlePinClick={this.handlePinClick}
                handleSubmit={this.handleSubmit}
                selectedPinOptions={this.state.selectedPinOptions}
            />
        );
    }
    handlePinClick = (e, pinID) => {
        e.preventDefault();
        const { selectedPinOptions } = this.state;
        const newCheckedPins = selectedPinOptions.includes(pinID)
            ? selectedPinOptions.filter(val => val !== pinID)
            : [...selectedPinOptions, pinID];

        this.setState({
            selectedPinOptions: newCheckedPins
        });
    };

    handleAddIncluded = () => {};

    handleAddExcluded = () => {};

    handleSubmit = () => {
        const { selectedPinOptions, pinOptions } = this.state;
        const { handleChange } = this.props;

        const setPinInclude = Object.values(pinOptions).map(
            ({ included, ...pin }) => ({
                ...pin,
                included: selectedPinOptions.includes(pin.value)
                    ? !included
                    : included
            })
        );
        const selectedPinIDs = setPinInclude
            .filter(({ included }) => included)
            .map(({ value }) => value);
        handleChange('pinIDs', selectedPinIDs);

        this.setState({ pinOptions: setPinInclude, selectedPinOptions: [] });
    };

    componentDidMount = () => {
        const {
            customFilters: { pins },
            handleChange
        } = this.props;
        if (pins.length) {
            this._setPinOptions();
            const selectedPinIDs = pins.map(({ id }) => id);
            handleChange('pinIDs', selectedPinIDs);
        }
    };

    componentDidUpdate = prevProps => {
        const {
            customFilters: { pins },
            filters: { pinIDs: oldPinIDs },
            handleChange
        } = this.props;
        if (prevProps.customFilters.pins.length !== pins.length) {
            this._setPinOptions();
            const pinIDs = pins.map(({ id }) => id);
            const newSelectedPins = oldPinIDs.filter(id => pinIDs.includes(id));
            handleChange('pinIDs', newSelectedPins);
        }
    };

    _setPinOptions = () => {
        const {
            customFilters: { pins }
        } = this.props;
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

export default withUpdateOnChange(PinSelectorContainer);
