import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import updateDrawingDropdownOptions from 'actions/companyAdmin/drawings/sync/updateDrawingDropdownOptions';

import AddPinFormContainer from './AddPinFormContainer';
import { shouldOptionValueBeIncluded } from 'helpers/manufacturers';
import { PIN_OPTION_TYPES_VALS } from '../../../../../constants/companyAdmin/enums';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';
import { componentDidMount } from '../../../../../helpers/generic';

const AddPinContainer = ({
    drawingID,
    drawing,
    fetchDrawingTemplates,
    fetchPinOptions,
    fetchPinOptionVersions,
    pinOptions,
    pinOptionVersions,
    serviceID,
}) => {
    componentDidMount(() => {
        fetchPinOptionVersions();
        fetchPinOptions();
        fetchDrawingTemplates(drawingID);

        fetchPins('drawing', drawingID);
    });

    const options = useMemo(() => {
        // todo handle set services
        const pinOptionsForService = Object.values(pinOptions).filter(
            ({ serviceIDs }) => !serviceIDs || serviceIDs.includes(serviceID),
        );
        const pinOptionVersionsGroupedByOptionID = Object.values(pinOptionVersions).reduce(
            (acc, version) => ({
                ...acc,
                [version.pinOptionID]: [...(acc[version.pinOptionID] || []), version],
            }),
            {},
        );
        return pinOptionsForService.map(pinOption => {
            const versions = pinOptionVersionsGroupedByOptionID[pinOption.id] ?? [];
            const latestVersion = versions.reduce((acc, version) =>
                version.revisionNumber > acc.revisionNumber ? version : acc,
            );
            return {
                ...pinOption,
                latestVersion,
                versions,
            };
        });
    }, [pinOptions, pinOptionVersions, serviceID]);

    const formatDropdownOptions = serviceID => {
        return;
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

    const isCorrectForDrawingAndServiceID = (serviceID, option) => {
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

    return (
        <AddPinFormContainer
            hierarchyType="drawing"
            drawingID={drawingID}
            formatDropdownOptions={formatDropdownOptions}
            pinOptions={options}
        />
    );
};

const mapStateToProps = (
    {
        companyAdmin: {
            addPinDropdownOptions: { dropdownOptions },
            addPinFormReducer: { serviceID },
            manufacturersReducer: {
                manufacturers: { installationTypes },
            },
            pinOptionsReducer: { options, isFetching: isFetchingPinOptions },
            pinOptionVersionsReducer: { versions, isFetching: isFetchingPinOptionVersions },
            drawingsReducer: { drawings },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
        },
    },
    { match },
) => ({
    drawingID: match.params.id,
    drawing: drawings[match.params.id],
    isFetching: isFetchingPinOptions || isFetchingPinOptionVersions,
    dropdownOptions,
    subscriptionServiceIDs,
    manufacturers: installationTypes,
    serviceID,
    pinOptions: options,
    pinOptionVersions: versions,
});

const mapDispatchToProps = {
    fetchDrawingTemplates,
    fetchDrawingDropdownOptions,
    fetchPins,
    updateDrawingDropdownOptions,
    fetchSingleDrawing,
    fetchPinOptions,
    fetchPinOptionVersions,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddPinContainer));
