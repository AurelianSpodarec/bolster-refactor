import React from 'react';
import EditPinQuestionsContainer from '../containers/EditPinQuestionsContainer';

const EditPinSections = ({ sections, selectedVersion, pinOptions, drawingID }) => (
    <EditPinQuestionsContainer
        sections={sections}
        selectedVersion={selectedVersion}
        pinOptions={pinOptions}
        drawingID={drawingID}
    />
);

export default EditPinSections;
