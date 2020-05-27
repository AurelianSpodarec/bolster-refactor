import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateDrawingDropdownOptions from 'actions/companyAdmin/drawings/sync/updateDrawingDropdownOptions';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import AddPinHistoryFormContainer from './AddPinHistoryFormContainer';
import { fetchManufacturerPinOptions } from 'helpers/redux';
import { isObjEmpty } from 'helpers/generic';

class AddPinHistoryContainer extends Component {
    render = () => {
        return (
            <AddPinHistoryFormContainer
                drawing={this.props.drawing}
                hierarchyType="pin"
                pinID={this.props.pinID}
                isHistory
            />
        );
    };

    componentDidMount = async () => {
        const {
            pinID,
            fetchSinglePin,
            fetchDrawingDropdownOptions,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
            fetchSingleDrawing,
        } = this.props;
        fetchSinglePin(pinID).then(
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

            const {
                dropdownOptions,
                drawing,
                optionValues,
                updateDrawingDropdownOptions,
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

                const drawingOptionValues = formattedManufacturerOptionValues.reduce(
                    (acc, option) => {
                        if (drawingOptionValueIDs.includes(option.id)) {
                            // mark the types that need to be removed from the dropdown options
                            if (!originalOptionTypesToRemove.includes(option.type)) {
                                originalOptionTypesToRemove.push(option.type);
                            }
                            acc.push({ ...option });
                        }
                        return acc;
                    },
                    [],
                );

                const dropdownOptionsFilteredArray = dropdownOptions.filter(option => {
                    const areManufacturingOptionsReplacingThisOption = originalOptionTypesToRemove.includes(
                        option.type,
                    );
                    return !areManufacturingOptionsReplacingThisOption;
                }, []);

                const newOptions = [...dropdownOptionsFilteredArray, ...drawingOptionValues];

                updateDrawingDropdownOptions(newOptions);
            }
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
        },
    },
    { match: { params } },
) => ({
    pinID: params.id,
    optionValues: manufacturersOptionValues,
    drawing: pins[params.id] ? drawings[pins[params.id].drawingID] : {},
    isFetching: isFetching,
    dropdownOptions,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    fetchSinglePin,
    fetchDrawingDropdownOptions,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    updateDrawingDropdownOptions,
    fetchSingleDrawing,
};

const WithRedux = connect(mapStateToProps, mapDispatchToProps)(AddPinHistoryContainer);

export default withRouter(WithRedux);
