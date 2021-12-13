import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateDrawingDropdownOptions from 'actions/companyAdmin/drawings/sync/updateDrawingDropdownOptions';

import AddPinFormContainer from './AddPinFormContainer';
import { fetchManufacturerPinOptions } from 'helpers/redux';
import { isObjEmpty } from 'helpers/generic';
import { shouldOptionValueBeIncluded } from 'helpers/manufacturers';

class AddPinContainer extends Component {
    render = () => (
        <AddPinFormContainer
            hierarchyType="drawing"
            drawingID={this.props.drawingID}
            formatDropdownOptions={this.formatDropdownOptions}
        />
    );

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

            this.formatDropdownOptions();
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

        if (drawing.isManufacturingEnabled) {
            const originalOptionTypesToRemove = [];

            const formattedManufacturerOptionValues = Object.values(optionValues).reduce(
                (acc, options) => {
                    return [...acc, ...Object.values(options)];
                },
                [],
            );

            const drawingOptionValues = formattedManufacturerOptionValues.reduce((acc, option) => {
                if (this.isCorrectForDrawingAndServiceID(serviceID, option)) {
                    if (!originalOptionTypesToRemove.includes(option.type)) {
                        originalOptionTypesToRemove.push(option.type);
                    }

                    if (shouldOptionValueBeIncluded(option.serviceIDs, subscriptionServiceIDs)) {
                        acc.push({ ...option });
                    }
                }
                return acc;
            }, []);

            const dropdownOptionsFilteredArray = dropdownOptions.filter(option => {
                const areManufacturingOptionsReplacingThis = originalOptionTypesToRemove.includes(
                    option.type,
                );
                return !areManufacturingOptionsReplacingThis;
            }, []);

            const newOptions = [...dropdownOptionsFilteredArray, ...drawingOptionValues];

            const filteredNewOptions = newOptions.filter(val => {
                if (!serviceID) return true;
                else {
                    if (val.serviceIDs?.includes(Number(serviceID)) || !val.serviceIDs) return true;
                    else return false;
                }
            });
            console.log({ filteredNewOptions });
            updateDrawingDropdownOptions(filteredNewOptions);
        } else {
            const formattedOptionValues = Object.values(dropdownOptions).flat();

            const filteredOptionValues = formattedOptionValues.filter(val => {
                if (!serviceID) return true;
                else {
                    return val.serviceIDs?.includes(Number(serviceID)) || !val.serviceIDs;
                }
            });
            updateDrawingDropdownOptions(filteredOptionValues);
        }
    };

    isCorrectForDrawingAndServiceID = (serviceID, option) => {
        const { drawing, manufacturers } = this.props;
        const drawingOptionValueIDs = drawing.optionValueIDs ?? [];

        if (serviceID && drawingOptionValueIDs?.includes(option.id)) {
            if (option.serviceIDs?.includes(Number(serviceID))) {
                return true;
            } else if (option.serviceIDs === null) {
                const manufacturer = manufacturers[option.manufacturerID];

                return (
                    manufacturer?.serviceIDs?.includes(Number(serviceID)) ||
                    manufacturer?.serviceIDs === null
                );
            }
        } else {
            return drawingOptionValueIDs?.includes(option.id);
        }
    };
}

const mapStateToProps = (
    {
        companyAdmin: {
            addPinDropdownOptions: { dropdownOptions },
            manufacturersReducer: {
                manufacturers: { installationTypes },
            },
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
    manufacturers: installationTypes,
});

const mapDispatchToProps = {
    fetchDrawingTemplates,
    fetchDrawingDropdownOptions,
    fetchPins,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    updateDrawingDropdownOptions,
    fetchSingleDrawing,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinContainer));
