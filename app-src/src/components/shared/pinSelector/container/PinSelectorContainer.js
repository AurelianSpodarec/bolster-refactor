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
            pinOption => pinOption.included === false
        );

        return (
            <PinSelector
                excludedPins={excludedPins}
                handlePinClick={this.handlePinClick}
            />
        );
    }

    //onClick a pin
    //on submit, map new array of pins with isIncluded for checked

    handlePinClick = (e, pinID) => {
        const { selectedPinOptions } = this.state;

        //add pinID to selectedOptions array

        const checkedPins = selectedPinOptions;
        const newCheckedPins = checkedPins.includes(pinID);

        this.setState({});
    };

    handleSubmit = () => {
        //map out each pin from selectedOption to have !included
    };

    componentDidMount = () => {
        const { fetchPins, pins } = this.props;

        // if (pins.length) this._setPinOptions();
        fetchPins();
    };

    componentDidUpdate = prevProps => {
        const { pins } = this.props;

        const { pinOptions } = this.state;

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
