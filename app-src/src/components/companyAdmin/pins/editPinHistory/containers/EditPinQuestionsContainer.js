import React from 'react';
import { connect } from 'react-redux';

import EditPinQuestions from '../presentational/EditPinQuestions';

const EditPinQuestionsContainer = ({ sections, questions, answers }) => (
    <EditPinQuestions
        sections={Object.values(sections)}
        questions={questions}
        answers={answers}
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
