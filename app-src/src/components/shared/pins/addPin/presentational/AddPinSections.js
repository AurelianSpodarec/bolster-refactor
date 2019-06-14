import React from 'react';
import AddPinQuestionsContainer from '../containers/AddPinQuestionsContainer';

const AddPinSections = ({ sections, selectedVersion, isHistory }) => (
    <AddPinQuestionsContainer
        isHistory={isHistory}
        sections={sections}
        selectedVersion={selectedVersion}
    />
);

export default AddPinSections;
