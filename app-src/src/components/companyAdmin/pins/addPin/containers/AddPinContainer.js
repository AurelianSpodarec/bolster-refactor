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
import { shouldOptionValueBeIncluded } from 'helpers/manufacturers';
import { isObjEmpty } from 'helpers/generic';
import { PIN_OPTION_TYPES_VALS } from '../../../../../constants/companyAdmin/enums';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';

class AddPinContainer extends Component {
    render = () => (
        <AddPinFormContainer
            hierarchyType="drawing"
            drawingID={this.props.drawingID}
            formatDropdownOptions={this.formatDropdownOptions}
        />
    );

    componentDidMount = () => {
        const { drawingID, fetchDrawingTemplates } = this.props;

        fetchDrawingTemplates(drawingID);

        fetchPins('drawing', drawingID);
    };

    componentDidUpdate = prevProps => {
        const { serviceID } = this.props;

        if (prevProps.serviceID !== serviceID) {
            this.fetchDropdownOptions();
        }

        if (
            prevProps.isFetching &&
            !this.props.isFetching &&
            !isObjEmpty(this.props.optionValues)
        ) {
            this.formatDropdownOptions(serviceID);
        }
    };

    fetchDropdownOptions = () => {
        const {
            drawingID,
            fetchDrawingDropdownOptions,
            fetchManufacturersByPinOptionType,
            fetchAllOptionValues,
        } = this.props;

        fetchDrawingDropdownOptions(drawingID)
            .then(() => {
                fetchSingleDrawing(drawingID);
            })
            .then(() => {
                fetchManufacturerPinOptions(
                    fetchManufacturersByPinOptionType,
                    fetchAllOptionValues,
                );
            });
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
                if (val.isDisabled) return false;

                if (
                    val.type === PIN_OPTION_TYPES_VALS.itemTypes &&
                    drawing.dropDownOptionIDs?.length &&
                    !drawing.dropDownOptionIDs.includes(val.id)
                ) {
                    return false;
                }

                if (!serviceID) return true;
                else {
                    if (val.serviceIDs?.includes(Number(serviceID)) || !val.serviceIDs) return true;
                    else return false;
                }
            });

            updateDrawingDropdownOptions(filteredNewOptions);
        } else {
            const formattedOptionValues = Object.values(dropdownOptions).flat();

            const filteredOptionValues = formattedOptionValues.filter(val => {
                if (val.isDisabled) return false;

                if (
                    val.type === PIN_OPTION_TYPES_VALS.itemTypes &&
                    drawing.dropDownOptionIDs?.length &&
                    !drawing.dropDownOptionIDs.includes(val.id)
                ) {
                    return false;
                }

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
            addPinDropdownOptions: { dropdownOptions, serviceID },
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
    serviceID,
});

const mapDispatchToProps = {
    fetchDrawingTemplates,
    fetchDrawingDropdownOptions,
    fetchPins,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    updateDrawingDropdownOptions,
    fetchSingleDrawing,
    fetchPinOptions,
    fetchPinOptionVersions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinContainer));
