import React from 'react';
import { connect } from 'react-redux';

import AddPinQuestions from '../presentational/AddPinQuestions';

const AddPinQuestionsContainer = ({ sections, questions, selectedVersion }) => (
    <AddPinQuestions
        sections={Object.values(sections)}
        questions={questions}
        selectedVersion={selectedVersion}
    />
);

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions }
    }
}) => ({
    questions: Object.values(questions)
});

export default connect(mapStateToProps)(AddPinQuestionsContainer);
