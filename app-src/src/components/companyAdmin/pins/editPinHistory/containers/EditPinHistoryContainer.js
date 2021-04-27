import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateDrawingDropdownOptions from 'actions/companyAdmin/drawings/sync/updateDrawingDropdownOptions';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

import EditPinFormContainer from './EditPinFormContainer';
import { fetchManufacturerPinOptions } from 'helpers/redux';
import { isObjEmpty } from 'helpers/generic';
import { shouldOptionValueBeIncluded } from 'helpers/manufacturers';

class EditPinHistoryContainer extends Component {
    state = {
        isReady: false,
    };

    render() {
        const { pinID, historyID } = this.props;

        return (
            <EditPinFormContainer
                hierarchyType="pin"
                pinID={pinID}
                historyID={historyID}
                isReady={this.state.isReady}
                drawing={this.props.drawing}
                formatDropdownOptions={this.formatDropdownOptions}
            />
        );
    }

    componentDidMount = () => {
        const {
            pinID,
            fetchSinglePin,
            fetchDrawingDropdownOptions,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
            fetchSingleDrawing,
        } = this.props;

        fetchSinglePin(pinID, true).then(
            ({
                payload: {
                    pin: { drawingID },
                },
            }) => {
                fetchDrawingDropdownOptions(drawingID)
                    .then(() => {
                        return fetchSingleDrawing(drawingID);
                    })
                    .then(async () => {
                        return fetchManufacturerPinOptions(
                            fetchManufacturersByPinOptionType,
                            fetchAllOptionValues,
                        );
                    });
            },
        );
    };

    componentDidUpdate = prevProps => {
        if (
            prevProps.isFetching &&
            !this.props.isFetching &&
            !isObjEmpty(this.props.optionValues)
        ) {
            // replace add pin dropdown options with manufacturer enabled options if applicable
            const { selectedHistory } = this.props;
            this.formatDropdownOptions(selectedHistory.serviceID);
        }
    };

    formatDropdownOptions = serviceID => {
        const {
            dropdownOptions,
            drawing,
            optionValues,
            updateDrawingDropdownOptions,
            subscriptionServiceIDs,
        } = this.props;

        // check to see if we should be using manufacturing pin options instead of the original dropdown options
        if (drawing.isManufacturingEnabled) {
            const drawingOptionValueIDs = drawing.optionValueIDs;
            const originalOptionTypesToRemove = [];

            // get manufacturer option values in an array ready to be reduced into the options that may replace certain fields.
            const formattedManufacturerOptionValues = Object.values(optionValues).reduce(
                (acc, options) => {
                    return [...acc, ...Object.values(options)];
                },
                [],
            );

            const drawingOptionValues = formattedManufacturerOptionValues.reduce((acc, option) => {
                const isCorrectForDrawingAndServiceID = serviceID
                    ? drawingOptionValueIDs.includes(option.id) &&
                      option.serviceIDs.includes(Number(serviceID))
                    : drawingOptionValueIDs.includes(option.id);

                if (isCorrectForDrawingAndServiceID) {
                    // mark the types that need to be removed from the dropdown options
                    if (!originalOptionTypesToRemove.includes(option.type)) {
                        originalOptionTypesToRemove.push(option.type);
                    }
                    if (shouldOptionValueBeIncluded(option.serviceIDs, subscriptionServiceIDs)) {
                        acc.push({ ...option });
                    }
                }
                return acc;
            }, []);

            // if manufacturing enabled for a specific pin option type, all dropdown options will need to be replaced by the manufacturers option values of that type
            const dropdownOptionsFilteredArray = dropdownOptions.filter(option => {
                const areManufacturingOptionsReplacing = originalOptionTypesToRemove.includes(
                    option.type,
                );
                return !areManufacturingOptionsReplacing;
            }, []);

            const newOptions = [...dropdownOptionsFilteredArray, ...drawingOptionValues];

            // alters the add pin dropdown options reducer with the list of manufacturer option values that need to be included instead
            updateDrawingDropdownOptions(newOptions);
            this.setState({ isReady: true });
        } else {
            this.setState({ isReady: true });
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            addPinDropdownOptions: { dropdownOptions },
            manufacturersOptionValuesReducer: { manufacturersOptionValues, isFetching },
            drawingsReducer: { drawings },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
            pinsReducer: { pins },
            pinHistoriesReducer: { histories },
        },
    },
    { match: { params } },
) => ({
    pinID: params.id,
    historyID: params.historyID,
    optionValues: manufacturersOptionValues,
    drawing: pins[params.id] ? drawings[pins[params.id].drawingID] : {},
    isFetching: isFetching,
    dropdownOptions,
    subscriptionServiceIDs,
    selectedHistory: histories[params.historyID] || {},
});

const mapDispatchToProps = {
    fetchSinglePin,
    fetchDrawingDropdownOptions,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    updateDrawingDropdownOptions,
    fetchSingleDrawing,
};

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(EditPinHistoryContainer);

export default withRouter(WithRedux);
