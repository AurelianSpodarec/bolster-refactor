import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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
import { shouldOptionValueBeIncluded } from 'helpers/manufacturers';

class AddPinHistoryContainer extends Component {
    state = {
        isReady: false,
    };
    render = () => {
        return (
            <AddPinHistoryFormContainer
                drawing={this.props.drawing}
                hierarchyType="pin"
                pinID={this.props.pinID}
                isHistory
                isReady={this.state.isReady}
                formatDropdownOptions={this.formatDropdownOptions}
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
            const { versions, latestPinHistory, templates } = this.props;
            const templateVersion =
                versions.find(version => latestPinHistory.templateVersionID === version.id) || {};

            const latestTemplateUsed =
                templates.find(template => templateVersion.templateID === template.id) || {};
            this.formatDropdownOptions(latestTemplateUsed.serviceID);
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
                const areManufacturingOptionsReplacingThis = originalOptionTypesToRemove.includes(
                    option.type,
                );
                return !areManufacturingOptionsReplacingThis;
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
            templatesReducer: { templates, isFetching: isFetchingTemplates },
            templateVersionsReducer: { versions },
        },
    },
    { match: { params } },
) => {
    const latestPinHistory =
        Object.values(histories).sort((a, b) => moment(b.createdOn) - moment(a.createdOn))[0] || {};

    return {
        pinID: params.id,
        optionValues: manufacturersOptionValues,
        drawing: pins[params.id] ? drawings[pins[params.id].drawingID] : {},
        isFetching: isFetching || isFetchingTemplates,
        dropdownOptions,
        subscriptionServiceIDs,
        templates: Object.values(templates).filter(({ isDeleted }) => !isDeleted),
        versions: Object.values(versions),
        latestPinHistory,
    };
};

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
