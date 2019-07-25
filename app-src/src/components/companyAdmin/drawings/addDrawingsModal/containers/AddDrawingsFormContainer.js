import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddDrawingsForm from '../presentational/AddDrawingsForm';
import createDrawings from 'actions/companyAdmin/drawings/async/createDrawings';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import updateHierarchyAddState from 'actions/companyAdmin/hierarchy/sync/updateHierarchyAddState';
import { useMultipleHierarchies } from 'helpers/hooks';
import createDrawing from 'actions/companyAdmin/drawings/async/createDrawing';

const AddDrawingsFormContainer = ({
    floorID,
    hideModal,
    createDrawing,
    createDrawings,
    updateHierarchyAddState,
    isUsingBolsterLabels,
    filesUploading,
    credits
}) => {
    const [
        drawings,
        updateDrawing,
        addDrawing,
        removeDrawing,
        getKeys,
        getPostBody
    ] = useMultipleHierarchies({
        name: '',
        file: '',
        isAlertShowing: false,
        message: '',
        dateToSend: ''
    });

    return (
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
        />
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
                    dateToSend
                } = drawing;

                isAlertShowing
                    ? createDrawing({
                          name,
                          file,
                          message,
                          dateToSend,
                          floorID
                      })
                    : createDrawing({ name, file, floorID });
            } else if (drawings.length > 1) {
                createDrawings({ drawings, floorID });
            }
            hideModal();
        }
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapStateToProps = ({
    companyAdmin: {
        creditsReducer: { credits }
    },
    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    filesUploading,
    credits: Object.values(credits).reduce(
        (acc, curr) => acc + curr.quantity,
        0
    )
});

const mapDispatchToProps = {
    createDrawing,
    createDrawings,
    hideModal,
    updateHierarchyAddState
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AddDrawingsFormContainer)
);
