import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchManufacturersByPinOptionType from 'actions/companyAdmin/manufacturers/async/fetchManufacturersByPinOptionType';
import fetchClientsForFloor from 'actions/companyAdmin/clients/async/fetchClientsForFloor';
import fetchOperativesForFloor from 'actions/companyAdmin/operatives/async/fetchOperativesForFloor';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';
import {
    createManufacturerOptionList,
    createOptionValuesList,
    createPreselectedManufacturersList,
    createPreselectedOptionValuesList,
    createHierarchyPreselectedManufacturersList,
    removeUnusedManufacturerDefaults,
} from 'helpers/manufacturers';

import createDrawings from 'actions/companyAdmin/drawings/async/createDrawings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies, usePrevious } from 'helpers/hooks';
import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import {
    DROPDOWN_OPTIONS,
    DROPDOWN_OPTION_MANUFACTURER_ENABLED,
} from 'constants/companyAdmin/enums';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import AddDrawingsForm from '../presentational/AddDrawingsForm';
import { showOAndMTsAndCsModal } from 'actions/shared/generic/modals/sync/showOAndMTsAndCsModal';

import {
    createPreselectedItemOptionValuesList,
    formatDropdownOptions,
    getPreselectedItemTypes,
} from 'helpers/itemTypes';
import fetchAllDropdownOptions from 'actions/companyAdmin/dropdownOptions/async/fetchAllDropdownOptions';

const AddDrawingsFormContainer = ({
    floorID,
    hideModal,
    createDrawing,
    createDrawings,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    filesUploading,
    credits,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    isFetching,
    manufacturers,
    optionValues,
    subscriptionServiceIDs,
    floor,
    useManufacturingByDefault,
    error,
    showOAndMTsAndCsModal,
    clients,
    operatives,
    fetchClientsForFloor,
    fetchOperativesForFloor,
    fetchingClients,
    fetchingOperatives,
    fetchAllCredits,
    fetchAllDropdownOptions,
    dropdownOptions,
    companyName,
    isFetchingHierarchies,
}) => {
    const [
        drawings,
        updateDrawing,
        addDrawing,
        removeDrawing,
        getKeys,
        getPostBody,
        // eslint-disable-next-line no-unused-vars
        _,
        setInitialManufacturerFloorOptions,
        updateSelectAll,
    ] = useMultipleHierarchies({
        name: '',
        file: '',
        isAlertShowing: false,
        message: '',
        dateToSend: '',
        isManufacturingInherited: false,
        setManufacturersForHierarchy: false,
        manufacturerOptions: [],
        selectedManufacturerOptions: [],
        selectedOptionValues: [],
        optionValuesOptions: {},
        clientPermissionIDs: [],
        operativePermissionIDs: [],
        isDropdownOptionsInherited: false,
        setDropdownOptionsForHierarchy: false,
        selectedDropdownOptions: [],
        dropdownOptions: [],
        startDate: '',
        isStartDateShowing: false,
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
        dropdownOptions: [],
    });

    const [areOptionsLoaded, setAreOptionsLoaded] = useState(false);

    const prevProps = usePrevious({ isFetching, fetchingOperatives, fetchingClients });

    const [showManufacturingOptions, setShowManufacturingOptions] = useState(true);

    const [showDropdownOptions, setShowDropdownOptions] = useState(true);

    useEffect(() => {
        fetchClientsForFloor(floorID).then(() => fetchOperativesForFloor(floorID));
        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled.
        // ** Wait for them to resolve before adding a drawing.
        async function getPinOptions() {
            const pinOptionTypes = Object.keys(DROPDOWN_OPTIONS).filter(option => {
                return DROPDOWN_OPTION_MANUFACTURER_ENABLED[option];
            });

            const fn = function fetchManufacturers(pinOptionType) {
                return fetchManufacturersByPinOptionType(pinOptionType);
            };
            await fetchAllDropdownOptions(2);

            const manufacturerActions = pinOptionTypes.map(fn);
            await Promise.all(manufacturerActions).then(() => {
                fetchAllOptionValues();
            });
        }
        getPinOptions();
    }, [fetchManufacturersByPinOptionType, fetchAllOptionValues]);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching) {
            const isManufacturingInherited = floor.manufacturingInheritedFrom;
            const isDropdownOptionsInherited = floor.isDropDownOptionsEnabled;

            const initialOptions = {
                isManufacturingInherited,
                setManufacturersForHierarchy: null,
                optionValuesOptions: null,
                selectedOptionValues: null,
                manufacturerOptions: null,
                selectedManufacturerOptions: null,
                manufacturingInheritedFrom: null,
            };
            const initialDropOptions = {
                isDropdownOptionsInherited,
                isDropDownOptionsInheritedFrom: floor.isDropDownOptionsInheritedFrom,
                setDropdownOptionsForHierarchy: isDropdownOptionsInherited,
                dropdownOptions: formatDropdownOptions(dropdownOptions),
                selectedDropdownOptions: floor.dropDownOptionIDs
                    ? createPreselectedItemOptionValuesList(floor.dropDownOptionIDs)
                    : getPreselectedItemTypes(dropdownOptions),
            };

            if (floor.isDropDownOptionsEnabled) {
                setShowDropdownOptions(false);
            }

            if (isManufacturingInherited) {
                // prefill options from hierarchy above

                initialOptions.setManufacturersForHierarchy = true;
                initialOptions.optionValuesOptions = createOptionValuesList(
                    optionValues,
                    subscriptionServiceIDs,
                );
                initialOptions.selectedOptionValues = floor.optionValueIDs.map(id => String(id));

                initialOptions.manufacturerOptions = createManufacturerOptionList(manufacturers);
                const selected = createHierarchyPreselectedManufacturersList(
                    initialOptions.manufacturerOptions,
                    optionValues,
                    initialOptions.selectedOptionValues,
                );
                initialOptions.selectedManufacturerOptions = selected;
                initialOptions.manufacturingInheritedFrom = floor.manufacturingInheritedFrom;
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

            const clientIDs = clients.map(({ id }) => id + '');
            Object.values(drawings).forEach(drawing => {
                updateDrawing(`${drawing.id}.*.clientPermissionIDs`, clientIDs);
            });
            const operativeIDs = operatives.map(({ id }) => id + '');
            Object.values(drawings).forEach(drawing => {
                updateDrawing(`${drawing.id}.*.operativePermissionIDs`, operativeIDs);
            });
            setInitialOptions(initialOptions);
            setInititalDropdownOptions(initialDropOptions);
            const combinedOptions = { ...initialOptions, ...initialDropOptions };

            setInitialManufacturerFloorOptions(combinedOptions);

            setAreOptionsLoaded(true);
            if (useManufacturingByDefault && !isManufacturingInherited) {
                handleShowOandMModal();
            }
        }
    }, [isFetching]);

    const clientOptions = clients.map(({ id, userFirstName, userLastName, companyName }) => ({
        value: id,
        text: `${userFirstName} ${userLastName} (${companyName})`,
    }));
    const operativeOptions = operatives
        .filter(item => companyName === item.companyName)
        .map(({ id, userFirstName, userLastName, companyName }) => ({
            value: id,
            text: `${userFirstName} ${userLastName} (${companyName})`,
        }));

    const combinedOptions = { ...initialOptions, ...initialDropdownOptions };

    return (
        <BlockContainer
            isEmpty={isFetching || !areOptionsLoaded}
            isFetching={isFetching || !areOptionsLoaded}
            error={error}
            contentClass="no-padding no-border"
        >
            <AddDrawingsForm
                drawings={Object.values(drawings)}
                updateDrawing={updateDrawing}
                addDrawing={addDrawing}
                removeDrawing={removeDrawing}
                drawingIDs={getKeys()}
                floorID={floorID}
                hideModal={hideModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                isUsingBolsterLabels={isUsingBolsterLabels}
                filesUploading={filesUploading}
                credits={credits}
                initialOptions={initialOptions}
                setShowManufacturingOptions={setShowManufacturingOptions}
                showManufacturingOptions={showManufacturingOptions}
                handleShowOandMModal={handleShowOandMModal}
                operativeOptions={operativeOptions}
                clientOptions={clientOptions}
                showDropdownOptions={showDropdownOptions}
                setShowDropdownOptions={setShowDropdownOptions}
                initialDropdownOptions={initialDropdownOptions}
                floorName={floor.name}
                combinedOptions={combinedOptions}
                updateSelectAll={updateSelectAll}
                isFetchingHierarchies={isFetchingHierarchies}
            />
        </BlockContainer>
    );

    function handleSubmit() {
        const drawings = getPostBody();

        if (!filesUploading) {
            if (drawings.length === 1) {
                const [drawing] = drawings;
                const {
                    name,
                    file,
                    isAlertShowing,
                    message,
                    dateToSend,
                    clientPermissionIDs,
                    operativePermissionIDs,
                    setManufacturersForHierarchy,
                    selectedDropdownOptions,
                    setDropdownOptionsForHierarchy,
                    startDate,
                    isStartDateShowing,
                } = drawing;

                const optionValueIDs = removeUnusedManufacturerDefaults(drawing);

                const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                    ? {}
                    : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                const dropdownEnabledOptions = initialDropdownOptions.isDropdownOptionsInherited
                    ? {}
                    : {
                          isDropDownOptionsEnabled: setDropdownOptionsForHierarchy,
                          dropDownOptionIDs: selectedDropdownOptions,
                      };

                const postBody = {
                    name,
                    file,
                    startDate: isStartDateShowing ? startDate : null,
                    floorID,
                    clientPermissionIDs,
                    operativePermissionIDs,
                    ...manufacturingEnabledOptions,
                    ...dropdownEnabledOptions,
                };
                if (isAlertShowing) {
                    postBody.message = message;
                    postBody.dateToSend = dateToSend;
                }

                createDrawing(postBody).then(fetchAllCredits);
            } else if (drawings.length > 1) {
                const formattedDrawings = drawings.map(drawing => {
                    const {
                        name,
                        file,
                        startDate,
                        isStartDateShowing,
                        isAlertShowing,
                        dateToSend,
                        message,
                        setManufacturersForHierarchy,
                        clientPermissionIDs,
                        operativePermissionIDs,
                        selectedDropdownOptions,
                        setDropdownOptionsForHierarchy,
                    } = drawing;

                    const optionValueIDs = removeUnusedManufacturerDefaults(drawing);

                    const manufacturingEnabledOptions = initialOptions.isManufacturingInherited
                        ? {}
                        : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                    const dropdownEnabledOptions = initialDropdownOptions.isDropdownOptionsInherited
                        ? {}
                        : {
                              isDropDownOptionsEnabled: setDropdownOptionsForHierarchy,
                              dropDownOptionIDs: selectedDropdownOptions,
                          };
                    const postBody = {
                        name,
                        file,
                        startDate: isStartDateShowing ? startDate : null,
                        floorID,
                        clientPermissionIDs,
                        operativePermissionIDs,
                        ...manufacturingEnabledOptions,
                        ...dropdownEnabledOptions,
                    };
                    if (isAlertShowing) {
                        postBody.message = message;
                        postBody.dateToSend = dateToSend;
                    }

                    return postBody;
                });
                createDrawings({ drawings: formattedDrawings, floorID }).then(fetchAllCredits);
            }
            hideModal();
        }
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
    function handleShowOandMModal() {
        showOAndMTsAndCsModal('add drawing');
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { buildingError, buildings },
            floorsReducer: { floorError, floors, isFetching: isFetchingFloors },
            drawingsReducer: { isFetching: isFetchingDrawings },
            companySettingsReducer: {
                companySettings: { name, isUsingBolsterLabels, useManufacturingByDefault },
            },
            clientsReducer: { clients, isFetching: fetchingClients },
            operativesReducer: { operatives, operativesSpecific, isFetching: fetchingOperatives },

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

            creditsReducer: { credits },
        },
        shared: {
            filesUploadingReducer: { filesUploading },
        },
    },
    { floorID },
) => ({
    filesUploading,
    credits: Object.values(credits).reduce((acc, curr) => acc + curr.quantity, 0),

    isUsingBolsterLabels,
    error: floorError || manufacturersError || optionValuesError || buildingError,
    floor: floors[floorID],
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching:
        isFetchingManufacturers ||
        isFetchingOptionValues ||
        fetchingOperatives ||
        fetchingClients ||
        isFetchingDropdownOptions,
    useManufacturingByDefault,
    subscriptionServiceIDs,
    clients: Object.values(clients),
    operatives: Object.values(operatives),
    operativesSpecific: Object.values(operativesSpecific),
    fetchingClients,
    fetchingOperatives,
    dropdownOptions: Object.values(dropdownOptions),
    building: Object.values(buildings),
    companyName: name,
    isFetchingHierarchies: isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createDrawing,
    createDrawings,
    hideModal,
    updateHierarchyAddState,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
    fetchOperativesForFloor,
    fetchClientsForFloor,
    fetchAllDropdownOptions,
    fetchAllCredits,
    showOAndMTsAndCsModal,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddDrawingsFormContainer));
