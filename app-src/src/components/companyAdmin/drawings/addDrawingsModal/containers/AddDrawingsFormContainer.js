import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchClientsForFloor from 'actions/companyAdmin/clients/async/fetchClientsForFloor';
import fetchOperativesForFloor from 'actions/companyAdmin/operatives/async/fetchOperativesForFloor';
import fetchAllCredits from 'actions/companyAdmin/credits/fetchAllCredits';

import createDrawings from 'actions/companyAdmin/drawings/async/createDrawings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies, usePrevious } from 'helpers/hooks';
import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import AddDrawingsForm from '../presentational/AddDrawingsForm';
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
    isFetching,
    floor,
    error,
    clients,
    operatives,
    fetchClientsForFloor,
    fetchOperativesForFloor,
    fetchingClients,
    fetchingOperatives,
    fetchAllCredits,
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
        updateSelectAll,
    ] = useMultipleHierarchies({
        name: '',
        file: '',
        clientPermissionIDs: [],
        operativePermissionIDs: [],
        startDate: '',
        isStartDateShowing: false,
    });

    const prevProps = usePrevious({ isFetching, fetchingOperatives, fetchingClients });

    useEffect(() => {
        fetchClientsForFloor(floorID).then(() => fetchOperativesForFloor(floorID));
        // ** Only do a fetch for the manufacturers of a specific type if manufacturing is enabled.
        // ** Wait for them to resolve before adding a drawing.
    }, [floorID, fetchClientsForFloor, fetchOperativesForFloor]);

    useEffect(() => {
        if (prevProps.isFetching && !isFetching) {
            const clientIDs = clients.map(({ id }) => id + '');
            Object.values(drawings).forEach(drawing => {
                updateDrawing(`${drawing.id}.*.clientPermissionIDs`, clientIDs);
            });
            const operativeIDs = operatives.map(({ id }) => id + '');
            Object.values(drawings).forEach(drawing => {
                updateDrawing(`${drawing.id}.*.operativePermissionIDs`, operativeIDs);
            });
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

    return (
        <BlockContainer isFetching={isFetching} error={error} contentClass="no-padding no-border">
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
                operativeOptions={operativeOptions}
                clientOptions={clientOptions}
                floorName={floor.name}
                isFetchingHierarchies={isFetchingHierarchies}
                updateSelectAll={updateSelectAll}
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
                    clientPermissionIDs,
                    operativePermissionIDs,
                    startDate,
                    isStartDateShowing,
                } = drawing;

                const postBody = {
                    name,
                    file,
                    startDate: isStartDateShowing ? startDate : null,
                    floorID,
                    clientPermissionIDs,
                    operativePermissionIDs,
                };

                createDrawing(postBody).then(fetchAllCredits);
            } else if (drawings.length > 1) {
                const formattedDrawings = drawings.map(drawing => {
                    const {
                        name,
                        file,
                        startDate,
                        isStartDateShowing,
                        clientPermissionIDs,
                        operativePermissionIDs,
                    } = drawing;

                    return {
                        name,
                        file,
                        startDate: isStartDateShowing ? startDate : null,
                        floorID,
                        clientPermissionIDs,
                        operativePermissionIDs,
                    };
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
};

const mapStateToProps = (
    {
        companyAdmin: {
            buildingsReducer: { buildingError, buildings },
            floorsReducer: { floorError, floors, isFetching: isFetchingFloors },
            drawingsReducer: { isFetching: isFetchingDrawings },
            companySettingsReducer: {
                companySettings: { name, isUsingBolsterLabels },
            },
            clientsReducer: { clients, isFetching: fetchingClients },
            operativesReducer: { operatives, operativesSpecific, isFetching: fetchingOperatives },

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
    error: floorError || buildingError,
    floor: floors[floorID],
    isFetching: fetchingOperatives || fetchingClients || subscriptionServiceIDs,
    clients: Object.values(clients),
    operatives: Object.values(operatives),
    operativesSpecific: Object.values(operativesSpecific),
    fetchingClients,
    fetchingOperatives,
    building: Object.values(buildings),
    companyName: name,
    isFetchingHierarchies: isFetchingFloors || isFetchingDrawings,
});

const mapDispatchToProps = {
    createDrawing,
    createDrawings,
    hideModal,
    updateHierarchyAddState,
    fetchOperativesForFloor,
    fetchClientsForFloor,
    fetchAllDropdownOptions,
    fetchAllCredits,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddDrawingsFormContainer));
