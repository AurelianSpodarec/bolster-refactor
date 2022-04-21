import React from 'react';
import { connect } from 'react-redux';

import AddPinQuestions from '../presentational/AddPinQuestions';

const AddPinQuestionsContainer = ({
    sections,
    questions,
    selectedVersion,
    isHistory,
    sectionIDs,
    isSameTemplate,
    pinAnswersByGroupKey,
    dropdownOptionsByType,
    oldAnswersByNameObj,
    template,
    latestPinHistory,
    pinOptions,
}) => (
    <AddPinQuestions
        isHistory={isHistory}
        sections={Object.values(sections)}
        questions={questions}
        selectedVersion={selectedVersion}
        sectionIDs={sectionIDs}
        isSameTemplate={isSameTemplate}
        pinAnswersByGroupKey={pinAnswersByGroupKey}
        dropdownOptionsByType={dropdownOptionsByType}
        oldAnswersByNameObj={oldAnswersByNameObj}
        template={template}
        latestPinHistory={latestPinHistory}
        pinOptions={pinOptions}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions },
    },
}) => ({
    questions: Object.values(questions),
});

export default connect(mapStateToProps)(AddPinQuestionsContainer);
