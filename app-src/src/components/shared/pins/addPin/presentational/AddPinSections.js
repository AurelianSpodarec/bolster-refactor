import React from 'react';
import AddPinQuestionsContainer from '../containers/AddPinQuestionsContainer';

const AddPinSections = ({ sections, selectedVersion }) => (
    <AddPinQuestionsContainer
        sections={sections}
        selectedVersion={selectedVersion}
    />
);

export default AddPinSections;
