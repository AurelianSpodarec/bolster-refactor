import React, { Component } from 'react';
import { connect } from 'react-redux';

import PinSelector from '../presentational/PinSelector';
import withUpdateOnChange from 'components/companyAdmin/reports/createReport/components/hocs/withUpdateOnChange';
import { sortArrayByKeyAndOrder } from 'helpers/generic';

class PinSelectorContainer extends Component {
    state = {
        pinOptions: {},
        selectedPinOptions: [],
        clicking: false
    };

    render() {
        const { fieldError, onMobile } = this.props;
        const includedPins = [];
        const excludedPins = [];
        const { pinOptions } = this.state;
        for (const key in pinOptions) {
            if (pinOptions[key].included) includedPins.push(pinOptions[key]);
            else excludedPins.push(pinOptions[key]);
        }
        return (
            <PinSelector
                excludedPins={sortArrayByKeyAndOrder(
                    excludedPins,
                    'text',
                    true
                )}
                includedPins={sortArrayByKeyAndOrder(
                    includedPins,
                    'text',
                    true
                )}
                handlePinClick={this.handlePinClick}
                handleSubmit={this.handleSubmit}
                selectedPinOptions={this.state.selectedPinOptions}
                handleAddExcluded={this.handleAddExcluded}
                handleAddIncluded={this.handleAddIncluded}
                handleMouseDown={this.handleMouseDown}
                handleMouseUp={this.handleMouseUp}
                handleMouseOut={this.handleMouseOut}
                clicking={this.state.clicking}
                error={fieldError}
                onMobile={onMobile}
            />
        );
    }

    handlePinClick = (e, pinID) => {
        e.preventDefault();
        if (e.shiftKey) {
            // shift
        }
        if (e.ctrlKey) {
            // ctrl
        } else {
            const { selectedPinOptions } = this.state;
            const newCheckedPins = selectedPinOptions.includes(pinID)
                ? selectedPinOptions.filter(val => val !== pinID)
                : [...selectedPinOptions, pinID];

            this.setState({
                selectedPinOptions: newCheckedPins
            });
        }
    };

    handleMouseDown = () => {
        this.setState({ clicking: true });
    };
    handleMouseUp = () => {
        this.setState({ clicking: false });
    };

    handleMouseOut = () => {
        if (this.state.clicking) this.setState({ clicking: false });
    };

    // ## currently unused but would be nice
    handleIncludeAll = () => {
        const pinOptions = this.state.pinOptions.map(pin => ({
            ...pin,
            included: true
        }));
        this.setState({ pinOptions });
    };
    handleExcludeAll = () => {
        const pinOptions = this.state.pinOptions.map(pin => ({
            ...pin,
            included: false
        }));
        this.setState({ pinOptions });
    };
    // ^^^^^^^^^^^^^^^^^^^^^^^

    handleAddIncluded = e => {
        e.preventDefault();
        const { selectedPinOptions, pinOptions: oldOptions } = this.state;
        const { handleChange } = this.props;
        const pinOptions = Object.values(oldOptions).map(option => ({
            ...option,
            included:
                option.included || selectedPinOptions.includes(option.value)
        }));
        const oldIDs = Object.values(oldOptions)
            .filter(({ included }) => included)
            .map(({ value }) => value);

        const pinIDs = Object.values(pinOptions)
            .filter(({ included }) => included)
            .map(({ value }) => value);
        this.setState({
            pinOptions,
            selectedPinOptions: selectedPinOptions.filter(id =>
                oldIDs.includes(id)
            )
        });

        handleChange('pinIDs', pinIDs);
    };

    handleAddExcluded = e => {
        e.preventDefault();
        const { selectedPinOptions } = this.state;
        const oldOptions = Object.values(this.state.pinOptions);
        const { handleChange } = this.props;
        const pinOptions = Object.values(oldOptions).map(option => ({
            ...option,
            included:
                option.included && !selectedPinOptions.includes(option.value)
        }));
        const oldIDs = Object.values(oldOptions)
            .filter(({ included }) => included)
            .map(({ value }) => value);

        const pinIDs = pinOptions
            .filter(({ included }) => included)
            .map(({ value }) => value);
        this.setState({
            pinOptions,
            selectedPinOptions: selectedPinOptions.filter(
                id => !oldIDs.includes(id)
            )
        });
        handleChange('pinIDs', pinIDs);
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
        const pinIDs = setIncludes.reduce(
            (acc, { included, value }) => (included ? [...acc, value] : acc),
            []
        );

        this.props.handleChange('pinIDs', pinIDs);
        this.setState({ pinOptions: setIncludes, selectedPinOptions: [] });
    };

    componentDidMount = () => {
        const { addFieldError } = this.props;
        addFieldError(
            'pinSelector',
            'You must include some pins in the report.'
        );
        this._setPinOptions();
    };

    componentWillUnmount = () => {
        const {
            customFilters: { pins },
            handleChange,
            removeFieldError
        } = this.props;
        const selectedPinIDs = pins.map(({ id }) => id);
        handleChange('pinIDs', selectedPinIDs);
        removeFieldError('pinSelector');
    };

    componentDidUpdate = (
        { customFilters: { pins: prevPins = [] } },
        { pinOptions: prevPinOptions }
    ) => {
        const {
            customFilters: { pins = [] },
            addFieldError,
            removeFieldError,
            fieldError
        } = this.props;

        const { pinOptions } = this.state;

        if (prevPins.length !== pins.length) {
            this._setPinOptions();
        }
        const pinIDs = Object.values(pinOptions).filter(
            ({ included }) => included
        );
        const prevPinIDs = Object.values(prevPinOptions).filter(
            ({ included }) => included
        );

        if (pinIDs.length !== prevPinIDs.length) {
            if (!pinIDs.length) {
                addFieldError(
                    'pinSelector',
                    'You must include some pins in the report.'
                );
            }
        }
        if (fieldError && pinIDs.length) {
            removeFieldError('pinSelector');
        }
    };

    _setPinOptions = () => {
        const pins = this.props.getFilteredPins(this.props.pins);
        const pinOptions = pins.reduce(
            (acc, { id: value, pinCode: text, status }) => ({
                ...acc,
                [value]: { value, text, status, included: true }
            }),
            {}
        );

        const pinIDs = Object.values(pinOptions).map(({ value }) => value);

        // const pinIDs = [];

        this.setState({ pinOptions });
        this.props.handleChange('pinIDs', pinIDs);
    };
}
const mapStateToProps = ({
    shared: {
        mobileReducer: { onMobile }
    },
    companyAdmin: {
        pinsReducer: { pins }
    }
}) => ({
    onMobile,
    pins: Object.values(pins)
});
export default withUpdateOnChange(
    connect(
        mapStateToProps,
        null
    )(PinSelectorContainer)
);
