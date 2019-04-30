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

    handleAddIncluded = () => {
        const { selectedPinOptions, pinOptions } = this.state;
        const { handleChange } = this.props;
        const pinIDs = pinOptions.reduce(
            (acc, { included, value }) =>
                included || selectedPinOptions.includes(value)
                    ? [...acc, value]
                    : acc,
            []
        );
        handleChange('pinID', pinIDs);
    };

    handleAddExcluded = () => {
        const { selectedPinOptions, pinOptions } = this.state;
        const { handleChange } = this.props;
        const pinIDs = pinOptions.reduce(
            (acc, { included, value }) =>
                included && !selectedPinOptions.includes(value)
                    ? [...acc, value]
                    : acc,
            []
        );
        handleChange('pinID', pinIDs);
    };

    handleSubmit = () => {
        const { selectedPinOptions, pinOptions } = this.state;
        const setIncludes = Object.values(pinOptions).map(
            ({ included, ...pin }) => ({
                ...pin,
                included: selectedPinOptions.includes(pin.value)
                    ? !included
                    : included
            })
        );
        const pinIDs = setIncludes.reduce((acc, { included, value }) =>
            included ? [...acc, value] : acc
        );

        this.props.handleChange('pinIDs', pinIDs);
        this.setState({ pinOptions: setIncludes, selectedPinOptions: [] });
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
        const pinOptions = this.props.customFilters.pins.reduce(
            (acc, { id: value, pinCode: text, status }) => ({
                ...acc,
                [value]: { value, text, status, included: true }
            }),
            {}
        );
        this.setState({ pinOptions });
    };
}

export default withUpdateOnChange(PinSelectorContainer);
