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

import CreateFloorsForm from '../presentational/CreateFloorsForm';
import createFloors from 'actions/companyAdmin/floors/async/createFloors';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies, usePrevious } from 'helpers/hooks';
import createFloor from 'actions/companyAdmin/floors/async/createFloor';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { isObjEmpty } from 'helpers/generic';

const CreateFloorsFormContainer = ({
    buildingID,
    hideModal,
    createFloor,
    createFloors,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    isFetching,
    manufacturers,
    optionValues,
    subscriptionServiceIDs,
    building,
    useManufacturingByDefault,
    error,
}) => {
    const [
        floors,
        updateFloor,
        addFloor,
        removeFloor,
        getKeys,
        getPostBody,
        _,
        setInitialManufacturerFloorOptions,
    ] = useMultipleHierarchies({
        name: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        isManufacturingSetAbove: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
    });

    const [initialOptions, setInitialOptions] = useState({
        isManufacturingSetAbove: false,
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
            const isManufacturingSetAbove = building.isManufacturingEnabled;

            const initialOptions = {
                isManufacturingSetAbove,
                setManufacturersForHierarchy: null,
                optionValuesOptions: null,
                selectedOptionValues: null,
                manufacturerOptions: null,
                selectedManufacturerOptions: null,
            };

            if (isManufacturingSetAbove) {
                // prefill options from hierarchy above

                initialOptions.setManufacturersForHierarchy = true;
                initialOptions.optionValuesOptions = createOptionValuesList(
                    optionValues,
                    subscriptionServiceIDs,
                );
                initialOptions.selectedOptionValues = building.optionValueIDs.map(id => String(id));

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
            setInitialManufacturerFloorOptions(initialOptions);
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
            <CreateFloorsForm
                floors={Object.values(floors)}
                updateFloor={updateFloor}
                addFloor={addFloor}
                removeFloor={removeFloor}
                floorIDs={getKeys()}
                getKeys
                buildingID={buildingID}
                hideModal={hideModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                isUsingBolsterLabels={isUsingBolsterLabels}
                initialOptions={initialOptions}
            />
        </BlockContainer>
    );

    function handleSubmit() {
        const floors = getPostBody();
        if (floors.length === 1) {
            const [floor] = floors;
            const {
                name,
                dateToSend,
                message,
                isAlertShowing,
                setManufacturersForHierarchy,
            } = floor;

            const optionValueIDs = removeUnusedManufacturerDefaults(floor);

            const manufacturingEnabledOptions = initialOptions.isManufacturingSetAbove
                ? {}
                : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

            isAlertShowing
                ? createFloor({
                      name,
                      buildingID,
                      message,
                      dateToSend,
                      ...manufacturingEnabledOptions,
                  })
                : createFloor({ name, buildingID, ...manufacturingEnabledOptions });
        }
        if (floors.length > 1) {
            const formattedFloors = floors.map(floor => {
                const {
                    name,
                    isAlertShowing,
                    dateToSend,
                    message,
                    setManufacturersForHierarchy,
                } = floor;

                const optionValueIDs = removeUnusedManufacturerDefaults(floor);

                const manufacturingEnabledOptions = initialOptions.isManufacturingSetAbove
                    ? {}
                    : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                return isAlertShowing
                    ? {
                          name,
                          buildingID,
                          dateToSend,
                          message,
                          ...manufacturingEnabledOptions,
                      }
                    : {
                          name,
                          buildingID,
                          ...manufacturingEnabledOptions,
                      };
            });
            createFloors({ floors: formattedFloors, buildingID });
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
            buildingsReducer: { buildingError, buildings },
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
    { buildingID },
) => ({
    isUsingBolsterLabels,
    error: buildingError || manufacturersError || optionValuesError,
    building: buildings[buildingID],
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    createFloor,
    createFloors,
    hideModal,
    updateHierarchyAddState,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateFloorsFormContainer));
