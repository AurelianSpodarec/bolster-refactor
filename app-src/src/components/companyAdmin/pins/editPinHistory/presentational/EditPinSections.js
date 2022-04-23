import React from 'react';
import EditPinQuestionsContainer from '../containers/EditPinQuestionsContainer';

const EditPinSections = ({ sections, selectedVersion, pinOptions }) => (
    <EditPinQuestionsContainer
        sections={sections}
        selectedVersion={selectedVersion}
        pinOptions={pinOptions}
    />
);

export default EditPinSections;
