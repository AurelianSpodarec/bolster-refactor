import React from 'react';
import EditPinQuestionsContainer from '../containers/EditPinQuestionsContainer';

const EditPinSections = ({ sections, selectedVersion }) => (
    <EditPinQuestionsContainer
        sections={sections}
        selectedVersion={selectedVersion}
    />
);

export default EditPinSections;
