import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import SelectorPinItem from '../presentational/SelectorPinItem';

class SelectorPinItemContainer extends Component {
    state = {
        active: false
    };

    render() {
        return (
            <SelectorPinItem
                handlePinClick={this.handlePinClick}
                pin={this.props.pin}
                active={this.state.active}
            />
        );
    }

    //onClick a pin
    //on submit, map new array of pins with isIncluded for checked

    handlePinClick = (e, pinID) => {
        const { handlePinClick } = this.props;

        handlePinClick(e, pinID);

        this.setState({
            active: !this.state.active
        });
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
)(SelectorPinItemContainer);
