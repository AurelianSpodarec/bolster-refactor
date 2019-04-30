import React, { Component } from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = ({
    companyAdmin: {
        pinsReducer: { pins }
    }
}) => ({
    pins: Object.values(pins) || []
});

export default connect(mapStateToProps)(SelectorPinItemContainer);
