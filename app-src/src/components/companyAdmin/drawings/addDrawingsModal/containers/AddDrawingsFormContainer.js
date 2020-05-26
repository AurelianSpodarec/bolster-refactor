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
import { isObjEmpty } from 'helpers/generic';

import AddDrawingsForm from '../presentational/AddDrawingsForm';

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
}) => {
    const [
        drawings,
        updateDrawing,
        addDrawing,
        removeDrawing,
        getKeys,
        getPostBody,
        _,
        setInitialManufacturerFloorOptions,
    ] = useMultipleHierarchies({
        name: '',
        file: '',
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
        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled. Wait for them to resolve before adding a drawing.
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
            const isManufacturingSetAbove = floor.isManufacturingEnabled;

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
                initialOptions.selectedOptionValues = floor.optionValueIDs.map(id => String(id));

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
                    setManufacturersForHierarchy,
                } = drawing;

                const optionValueIDs = removeUnusedManufacturerDefaults(drawing);

                const manufacturingEnabledOptions = initialOptions.isManufacturingSetAbove
                    ? {}
                    : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                isAlertShowing
                    ? createDrawing({
                          name,
                          file,
                          message,
                          dateToSend,
                          floorID,
                          ...manufacturingEnabledOptions,
                      })
                    : createDrawing({ name, file, floorID, ...manufacturingEnabledOptions });
            } else if (drawings.length > 1) {
                const formattedDrawings = drawings.map(drawing => {
                    const {
                        name,
                        file,
                        isAlertShowing,
                        dateToSend,
                        message,
                        setManufacturersForHierarchy,
                    } = drawing;

                    const optionValueIDs = removeUnusedManufacturerDefaults(drawing);

                    const manufacturingEnabledOptions = initialOptions.isManufacturingSetAbove
                        ? {}
                        : { isManufacturingEnabled: setManufacturersForHierarchy, optionValueIDs };

                    return isAlertShowing
                        ? {
                              name,
                              file,
                              floorID,
                              dateToSend,
                              message,
                              ...manufacturingEnabledOptions,
                          }
                        : {
                              name,
                              file,
                              floorID,
                              ...manufacturingEnabledOptions,
                          };
                });
                createDrawings({ drawings: formattedDrawings, floorID });
            }
            hideModal();
        }
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapStateToProps = (
    {
        companyAdmin: {
            floorsReducer: { floorError, floors },
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
    error: floorError || manufacturersError || optionValuesError,
    floor: floors[floorID],
    manufacturers,
    optionValues: manufacturersOptionValues,
    isFetching: isFetchingManufacturers || isFetchingOptionValues,
    useManufacturingByDefault,
    subscriptionServiceIDs,
});

const mapDispatchToProps = {
    createDrawing,
    createDrawings,
    hideModal,
    updateHierarchyAddState,
    fetchManufacturersByPinOptionType,
    fetchAllOptionValues,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddDrawingsFormContainer));
