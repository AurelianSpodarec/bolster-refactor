import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import {
    createManufacturerOptionList,
    createOptionValuesList,
    createPreselectedManufacturersList,
    createPreselectedOptionValuesList,
    createHierarchyPreselectedManufacturersList,
    removeUnusedManufacturerDefaults,
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
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
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
    useManufacturingByDefault,
    error,
}) => {
    const [
        buildings,
        updateBuilding,
        addBuilding,
        removeBuilding,
        getKeys,
        getPostBody,
        _,
        setInitialManufacturerBuildingOptions,
    ] = useMultipleHierarchies({
        name: '',
        location: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    });

    const [initialOptions, setInitialOptions] = useState({
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    });

    const [areOptionsLoaded, setAreOptionsLoaded] = useState(false);

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
            const isManufacturingInherited = site.isManufacturingEnabled;

            const initialOptions = {
                isManufacturingInherited,
                setManufacturersForHierarchy: null,
                optionValuesOptions: null,
                selectedOptionValues: null,
                manufacturerOptions: null,
                selectedManufacturerOptions: null,
            };

            if (isManufacturingInherited) {
                // prefill options from hierarchy above

                initialOptions.setManufacturersForHierarchy = true;
                initialOptions.optionValuesOptions = createOptionValuesList(
                    optionValues,
                    subscriptionServiceIDs,
                );
                initialOptions.selectedOptionValues = site.optionValueIDs.map(id => String(id));

                initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);
                initialOptions.selectedManufacturerOptions = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
            } else {
                // set default prefills as per the company admin options
                initialOptions.setManufacturersForHierarchy = useManufacturingByDefault;
                initialOptions.optionValuesOptions = createOptionValuesList(
                    optionValues,
                    subscriptionServiceIDs,
                );
                initialOptions.selectedOptionValues = createPreselectedOptionValuesList(
                    initialOptions.optionValuesOptions,
                );
                initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);
                initialOptions.selectedManufacturerOptions = createPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                );
            }

            setInitialOptions(initialOptions);
            setInitialManufacturerBuildingOptions(initialOptions);
            setAreOptionsLoaded(true);
        }
    }, [isFetching]);

    return (
        <BlockContainer
            isEmpty={isObjEmpty(manufacturers) || isObjEmpty(optionValues) || !areOptionsLoaded}
            isFetching={isFetching || !areOptionsLoaded}
            error={error}
            contentClass="no-padding"
        >
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
                initialOptions={initialOptions}
            />
        </BlockContainer>
    );

    function handleSubmit() {
        const buildings = getPostBody();

        if (buildings.length === 1) {
            const [building] = buildings;
            const {
                name,
                location,
                isAlertShowing,
                dateToSend,
                message,
                setManufacturersForHierarchy,
            } = building;

            const optionValueIDs = removeUnusedManufacturerDefaults(building);

            const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                ? {}
                : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

            if (isAlertShowing) {
                createBuilding({
                    name,
                    location,
                    siteID,
                    dateToSend,
                    message,
                    ...manufacturingEnabledOptions,
                });
            } else {
                createBuilding({
                    name,
                    location,
                    siteID,
                    ...manufacturingEnabledOptions,
                });
            }
        }

        if (buildings.length > 1) {
            const formattedBuildings = buildings.map(building => {
                const {
                    name,
                    location,
                    isAlertShowing,
                    dateToSend,
                    message,
                    setManufacturersForHierarchy,
                } = building;

                const optionValueIDs = removeUnusedManufacturerDefaults(building);

                const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                    ? {}
                    : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                return isAlertShowing
                    ? {
                          name,
                          location,
                          siteID,
                          dateToSend,
                          message,
                          ...manufacturingEnabledOptions,
                      }
                    : {
                          name,
                          location,
                          siteID,
                          ...manufacturingEnabledOptions,
                      };
            });

            createBuildings({ buildings: formattedBuildings, siteID });
        }
        hideModal();
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
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
