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
import {
    createPreselectedItemOptionValuesList,
    formatDropdownOptions,
    getPreselectedItemTypes,
} from 'helpers/itemTypes';
import { showOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/showOAndMTsAndCsModal';

import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

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
    fetchAllDropdownOptions,
    dropdownOptions,
    showOAndMTsAndCsModal,
    isFetchingHierarchies,
}) => {
    const [
        buildings,
        updateBuilding,
        addBuilding,
        removeBuilding,
        getKeys,
        getPostBody,
        // eslint-disable-next-line no-unused-vars
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
        isDropdownOptionsInherited: false,
        setDropdownOptionsForHierarchy: false,
        selectedDropdownOptions: [],
        dropdownOptions: {},
    });

    const [initialOptions, setInitialOptions] = useState({
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    });

    const [initialDropdownOptions, setInititalDropdownOptions] = useState({
        isDropdownOptionsInherited: false,
        setDropdownOptionsForHierarchy: false,
        selectedDropdownOptions: [],
        dropdownOptions: {},
    });

    const [showManufacturingOptions, setShowManufacturingOptions] = useState(true);
    const [showDropdownOptions, setShowDropdownOptions] = useState(true);
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
        fetchAllDropdownOptions(2);

        getPinOptions();
    }, [fetchManufacturersByPinOptionType, fetchAllOptionValues, fetchAllDropdownOptions]);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching) {
            const isManufacturingInherited = site.isManufacturingEnabled;
            const isDropdownOptionsInherited = site.isDropDownOptionsEnabled;

            const initialOptions = {
                isManufacturingInherited,
                setManufacturersForHierarchy: null,
                optionValuesOptions: null,
                selectedOptionValues: null,
                manufacturerOptions: null,
                selectedManufacturerOptions: null,
            };

            const initialDropdownOptions = {
                isDropdownOptionsInherited,
                setDropdownOptionsForHierarchy: false,
                selectedDropdownOptions: [],
                dropdownOptions: {},
            };

            if (isDropdownOptionsInherited) {
                initialDropdownOptions.setDropdownOptionsForHierarchy = true;
                initialDropdownOptions.dropdownOptions = formatDropdownOptions(dropdownOptions);
                const selectedOptions = createPreselectedItemOptionValuesList(
                    site.dropDownOptionIDs,
                );
                initialDropdownOptions.selectedDropdownOptions = selectedOptions;
                setShowDropdownOptions(false);
            }
            if (!isDropdownOptionsInherited) {
                initialDropdownOptions.setDropdownOptionsForHierarchy = false;
                initialDropdownOptions.dropdownOptions = formatDropdownOptions(dropdownOptions);
                initialDropdownOptions.selectedDropdownOptions =
                    getPreselectedItemTypes(dropdownOptions);
            }
            if (isManufacturingInherited) {
                // prefill options from hierarchy above

                initialOptions.setManufacturersForHierarchy = true;
                initialOptions.optionValuesOptions = createOptionValuesList(
                    optionValues,
                    subscriptionServiceIDs,
                );
                initialOptions.selectedOptionValues = site.optionValueIDs.map(id => String(id));

                initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);
                const selectedOptions = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );

                initialOptions.selectedManufacturerOptions = selectedOptions;
                setShowManufacturingOptions(false);
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
            setInititalDropdownOptions(initialDropdownOptions);

            const combinedOptions = { ...initialOptions, ...initialDropdownOptions };

            setInitialManufacturerBuildingOptions(combinedOptions);
            setAreOptionsLoaded(true);
            if (useManufacturingByDefault && !isManufacturingInherited) {
                handleShowOandMModal();
            }
        }
    }, [isFetching]);

    const combinedOptions = { ...initialOptions, ...initialDropdownOptions };

    return (
        <BlockContainer
            isEmpty={
                isObjEmpty(manufacturers) ||
                isObjEmpty(optionValues) ||
                !areOptionsLoaded ||
                isFetching
            }
            isFetching={isFetching || !areOptionsLoaded}
            error={error}
            contentClass="no-padding no-border"
        >
            <CreateBuildingsForm
                buildings={Object.values(buildings)}
                updateBuilding={updateBuilding}
                addBuilding={addBuilding}
                removeBuilding={removeBuilding}
                buildingIDs={getKeys()}
                getKeys
                siteID={siteID}
                siteName={site.name}
                hideModal={hideModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                isUsingBolsterLabels={isUsingBolsterLabels}
                initialOptions={initialOptions}
                showManufacturingOptions={showManufacturingOptions}
                setShowManufacturingOptions={setShowManufacturingOptions}
                showDropdownOptions={showDropdownOptions}
                setShowDropdownOptions={setShowDropdownOptions}
                initialDropdownOptions={initialDropdownOptions}
                combinedOptions={combinedOptions}
                handleShowOandMModal={handleShowOandMModal}
                isFetchingHierarchies={isFetchingHierarchies}
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
                selectedDropdownOptions,
                setDropdownOptionsForHierarchy,
            } = building;

            const optionValueIDs = removeUnusedManufacturerDefaults(building);

            const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                ? {}
                : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

            const dropdownEnabledOptions = initialDropdownOptions.isDropDownOptionsEnabled
                ? {}
                : {
                      isDropDownEnabled: setDropdownOptionsForHierarchy,
                      dropDownOptionIDs: selectedDropdownOptions,
                  };
            if (isAlertShowing) {
                createBuilding({
                    name,
                    location,
                    siteID,
                    dateToSend,
                    message,
                    ...dropdownEnabledOptions,
                    ...manufacturingEnabledOptions,
                });
            } else {
                createBuilding({
                    name,
                    location,
                    siteID,
                    ...dropdownEnabledOptions,
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
                    selectedDropdownOptions,
                    setDropdownOptionsForHierarchy,
                } = building;

                const optionValueIDs = removeUnusedManufacturerDefaults(building);

                const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                    ? {}
                    : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                const dropdownEnabledOptions = initialDropdownOptions.isDropDownOptionsEnabled
                    ? {}
                    : {
                          isDropDownOptionsEnabled: setDropdownOptionsForHierarchy,
                          dropDownOptionIDs: selectedDropdownOptions,
                      };

                return isAlertShowing
                    ? {
                          name,
                          location,
                          siteID,
                          dateToSend,
                          message,
                          ...dropdownEnabledOptions,
                          ...manufacturingEnabledOptions,
                      }
                    : {
                          name,
                          location,
                          siteID,
                          ...dropdownEnabledOptions,
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
    function handleShowOandMModal() {
        showOAndMTsAndCsModal('add building');
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            sitesReducer: { siteError, updatedSiteID, sites, isFetching: isFetchingSites },
            buildingsReducer: { isFetching: isFetchingBuildings },
            floorsReducer: { isFetching: isFetchingFloors },
            drawingsReducer: { isFetching: isFetchingDrawings },
            companySettingsReducer: {
                companySettings: { isUsingBolsterLabels, useManufacturingByDefault },
            },

            dropdownOptionsReducer: { dropdownOptions, isFetching: isFetchingDropdownOptions },
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
    isFetching: isFetchingManufacturers || isFetchingOptionValues || isFetchingDropdownOptions,
    useManufacturingByDefault,
    subscriptionServiceIDs,
    dropdownOptions: Object.values(dropdownOptions),
    isFetchingHierarchies:
        isFetchingSites || isFetchingBuildings || isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createBuilding,
    createBuildings,
    hideModal,
    updateHierarchyAddState,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    fetchAllDropdownOptions,
    showOAndMTsAndCsModal,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CreateBuildingsFormContainer),
);
