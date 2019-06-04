import React from 'react';
import { connect } from 'react-redux';

import EditPinQuestions from '../presentational/EditPinQuestions';

const EditPinQuestionsContainer = ({
    sections,
    questions,
    answers,
    selectedVersion
}) => (
    <EditPinQuestions
        sections={Object.values(sections)}
        questions={questions}
        answers={answers}
        selectedVersion={selectedVersion}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions },
        pinAnswersReducer: { answers }
    }
}) => ({
    questions: Object.values(questions),
    answers
});

export default connect(mapStateToProps)(EditPinQuestionsContainer);
