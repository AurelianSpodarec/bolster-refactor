import React from 'react';
import AddPinQuestionsContainer from '../containers/AddPinQuestionsContainer';

const AddPinSections = ({
    sections,
    selectedVersion,
    isHistory,
    sectionIDs,
    isSameTemplate,
    pinAnswersByGroupKey,
    oldAnswersByNameObj,
    template,
    latestPinHistory,
    pinOptions,
    drawingID,
}) => (
    <AddPinQuestionsContainer
        isHistory={isHistory}
        sections={sections}
        selectedVersion={selectedVersion}
        sectionIDs={sectionIDs}
        isSameTemplate={isSameTemplate}
        pinAnswersByGroupKey={pinAnswersByGroupKey}
        oldAnswersByNameObj={oldAnswersByNameObj}
        template={template}
        latestPinHistory={latestPinHistory}
        pinOptions={pinOptions}
        drawingID={drawingID}
    />
);

export default AddPinSections;
