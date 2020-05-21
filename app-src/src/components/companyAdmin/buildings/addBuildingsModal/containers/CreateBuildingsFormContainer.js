import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import {
    formatOptions,
    createManufacturerOptionList,
    createOptionValuesList,
    createPreselectedManufacturersList,
    createPreselectedOptionValuesList,
    createHierarchyPreselectedManufacturersList,
} from 'helpers/manufacturers';

import CreateBuildingsForm from '../presentational/CreateBuildingsForm';
import createBuildings from 'actions/companyAdmin/buildings/async/createBuildings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies, usePrevious } from 'helpers/hooks';
import createBuilding from 'actions/companyAdmin/buildings/async/createBuilding';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import { isObjEmpty } from 'helpers/generic';

const CreateBuildingsFormContainer = ({
    siteID,
    hideModal,
    createBuilding,
    createBuildings,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    isFetching,
    manufacturers,
    optionValues,
    subscriptionServiceIDs,
    site,
}) => {
    const [
        buildings,
        updateBuilding,
        addBuilding,
        removeBuilding,
        getKeys,
        getPostBody,
    ] = useMultipleHierarchies({
        name: '',
        location: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
    });

    const [defaultSelections, setDefaultSelections] = useState({
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    });

    const prevProps = usePrevious({ isFetching });

    useEffect(() => {
        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before adding a site.
        async function getPinOptions() {
            const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
                return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
            });

            const fn = function fetchManufacturers(pinOptionType) {
                return fetchManufacturersByPinOptionType(pinOptionType);
            };

            const actions = pinOptionTypes.map(fn);

            await Promise.all(actions).then(() => {
                fetchAllOptionValues();
            });
        }
        getPinOptions();
    }, [fetchManufacturersByPinOptionType, fetchAllOptionValues]);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching) {
            const isManufacturingSetAbove = site.isManufacturingEnabled;
            let optionValuesOptions;
            let selectedOptionValues;
            let manufacturerOptions;
            let selectedManufacturerOptions;

            if (isManufacturingSetAbove) {
                // prefill options from hierarchy above
                optionValuesOptions = createOptionValuesList(optionValues, subscriptionServiceIDs);
                selectedOptionValues = site.optionValueIDs;

                manufacturerOptions = createManufacturerOptionList(manufacturers);
                selectedManufacturerOptions = createHierarchyPreselectedManufacturersList(
                    manufacturerOptions,
                    optionValues,
                    selectedOptionValues,
                );
            } else {
                // set default prefills as per the company admin options
                optionValuesOptions = createOptionValuesList(optionValues, subscriptionServiceIDs);
                selectedOptionValues = createPreselectedOptionValuesList(optionValuesOptions);
                manufacturerOptions = createManufacturerOptionList(manufacturers);
                selectedManufacturerOptions = createPreselectedManufacturersList(
                    manufacturerOptions,
                );
            }

            setDefaultSelections({
                manufacturerOptions,
                selectedManufacturerOptions,
                selectedOptionValues,
                optionValuesOptions,
            });
        }
    }, [isFetching]);

    return (
        <CreateBuildingsForm
            buildings={Object.values(buildings)}
            updateBuilding={updateBuilding}
            addBuilding={addBuilding}
            removeBuilding={removeBuilding}
            buildingIDs={getKeys()}
            getKeys
            siteID={siteID}
            hideModal={hideModal}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            isUsingBolsterLabels={isUsingBolsterLabels}
        />
    );

    function handleSubmit() {
        const buildings = getPostBody();

        if (buildings.length === 1) {
            const [building] = buildings;
            const { name, location, isAlertShowing, dateToSend, message } = building;

            if (isAlertShowing) {
                createBuilding({
                    name,
                    location,
                    siteID,
                    dateToSend,
                    message,
                });
            } else {
                createBuilding({
                    name,
                    location,
                    siteID,
                });
            }
        }
        if (buildings.length > 1) {
            createBuildings({ buildings, siteID });
        }
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }

    // function removeUnusedManufacturerDefaults() {
    //     const {
    //         selectedOptionValues,
    //         optionValuesOptions,
    //         selectedManufacturerOptions,
    //         setManufacturersForSite,
    //     } = this.state;

    //     if (setManufacturersForSite) {
    //         const possibleOptionValues = Object.entries(optionValuesOptions).reduce(
    //             (acc, [manufacturerID, optionList]) => {
    //                 if (selectedManufacturerOptions.includes(manufacturerID)) {
    //                     const optionsToInclude = optionList.map(option => option.id);
    //                     acc = [...acc, ...optionsToInclude];
    //                 }
    //                 return acc;
    //             },
    //             [],
    //         );

    //         return selectedOptionValues.filter(option =>
    //             possibleOptionValues.includes(Number(option)),
    //         );
    //     } else {
    //         return [];
    //     }
    // }
};

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { siteError, updatedSiteID, sites },
            companySettingsReducer: {
                companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
            },
            manufacturersReducer: {
                manufacturers,
                isFetching: isFetchingManufacturers,
                error: manufacturersError,
            },
            manufacturersOptionValuesReducer: {
                manufacturersOptionValues,
                isFetching: isFetchingOptionValues,
                error: optionValuesError,
            },
            subscriptionsReducer: {
                subscriptions: { serviceIDs: subscriptionServiceIDs },
            },
        },
    },
    { siteID },
) => ({
    isUsingBolsterLabels,
    error: siteError || manufacturersError || optionValuesError,
    site: sites[siteID],
    updatedSiteID,
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    createBuilding,
    createBuildings,
    hideModal,
    updateHierarchyAddState,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateBuildingsFormContainer),
);
