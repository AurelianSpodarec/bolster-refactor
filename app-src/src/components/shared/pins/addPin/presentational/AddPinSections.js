import React from 'react';
import AddPinQuestionsContainer from '../containers/AddPinQuestionsContainer';

const AddPinSections = ({ 
    sections, 
    selectedVersion, 
    isHistory, 
    sectionIDs, 
    isSameTemplate, 
    pinAnswersByGroupKey, 
    dropdownOptionsByType, 
    oldAnswersByNameObj, 
    template,
    latestPinHistory
}) => (
    <AddPinQuestionsContainer
        isHistory={isHistory}
        sections={sections}
        selectedVersion={selectedVersion}
        sectionIDs={sectionIDs}
        isSameTemplate={isSameTemplate}
        pinAnswersByGroupKey={pinAnswersByGroupKey}
        dropdownOptionsByType={dropdownOptionsByType}
        oldAnswersByNameObj={oldAnswersByNameObj}
        template={template}
        latestPinHistory={latestPinHistory}
    />
);

export default AddPinSections;
