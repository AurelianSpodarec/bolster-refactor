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
    filesUploading
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
        templateUsageRule: ''
    });

    const templateUsageRuleOptions = {
        '1': { text: 'Use Only Owner Company', value: 1 },
        '2': { text: 'Use Only Own', value: 2 },
        '3': { text: 'Use Any', value: 3 }
    };

    return (
        <AddDrawingsForm
            drawings={Object.values(drawings)}
            templateUsageRuleOptions={templateUsageRuleOptions}
            templateUsageRules={Object.values(templateUsageRuleOptions)}
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
        />
    );

    function handleSubmit() {
        const drawings = getPostBody();
        if (!filesUploading) {
            if (drawings.length === 1) {
                const [drawing] = drawings;
                const { name, file, templateUsageRule } = drawing;
                createDrawing({ name, file, templateUsageRule, floorID });
            }
            createDrawings({ drawings, floorID });
            hideModal();
        }
    }

    function handleClose() {
        hideModal();
        updateHierarchyAddState(false);
    }
};

const mapStateToProps = ({
    shared: {
        filesUploadingReducer: { filesUploading }
    }
}) => ({
    filesUploading
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
