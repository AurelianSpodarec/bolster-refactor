import React from 'react';
import AddPinQuestionsContainer from '../containers/AddPinQuestionsContainer';

const AddPinSections = ({ sections, selectedVersion, isHistory, sectionIDs, isSameTemplate, pinAnswersByGroupKey, dropdownOptionsByType, oldAnswersByNameObj, template }) => (
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
    />
);

export default AddPinSections;
