import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

import AddPinFormContainer from './AddPinFormContainer';
import { fetchManufacturerPinOptions } from 'helpers/redux';
import { isObjEmpty } from 'helpers/generic';
import updateDrawingDropdownOptions from 'actions/companyAdmin/drawings/sync/updateDrawingDropdownOptions';

class AddPinContainer extends Component {
    render = () => <AddPinFormContainer hierarchyType="drawing" drawingID={this.props.drawingID} />;

    componentDidMount = async () => {
        const {
            drawingID,
            fetchDrawingTemplates,
            fetchDrawingDropdownOptions,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
        } = this.props;

        fetchDrawingTemplates(drawingID);
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

        fetchPins('drawing', drawingID);
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
        },
    },
    { match },
) => ({
    drawingID: match.params.id,
    optionValues: manufacturersOptionValues,
    drawing: drawings[match.params.id],
    isFetching: isFetching,
    dropdownOptions,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    fetchDrawingTemplates,
    fetchDrawingDropdownOptions,
    fetchPins,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    updateDrawingDropdownOptions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinContainer));
