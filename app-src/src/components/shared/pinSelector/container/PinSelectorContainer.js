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
        const selectedPinIDs = setPinInclude
            .filter(({ included }) => included)
            .map(({ value }) => value);
        updateSelectedPins(selectedPinIDs);

        this.setState({ pinOptions: setPinInclude, selectedPinOptions: [] });
    };

    componentDidMount = () => {
        const { pins, updateSelectedPins } = this.props;
        if (pins.length) {
            this._setPinOptions();
            const selectedPinIDs = pins.map(({ id }) => id);
            updateSelectedPins(selectedPinIDs);
        }
    };

    componentDidUpdate = prevProps => {
        const { pins, selectedPins, updateSelectedPins } = this.props;
        if (prevProps.pins.length !== this.props.pins.length) {
            this._setPinOptions();
            const pinIDs = pins.map(({ id }) => id);
            const newSelectedPins = selectedPins.filter(id =>
                pinIDs.includes(id)
            );
            updateSelectedPins(newSelectedPins);
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
            customFilters: { pins = {} },
            selectedPins
        }
    }
}) => ({
    pins: Object.values(pins),
    selectedPins
});

const mapDispatchToProps = dispatch => ({
    updateSelectedPins: pins => dispatch(updateSelectedPins(pins))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PinSelectorContainer);
