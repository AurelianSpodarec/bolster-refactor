import React from 'react';
import { connect } from 'react-redux';

import AddPinQuestions from '../presentational/AddPinQuestions';

const AddPinQuestionsContainer = ({ sections, questions }) => (
    <AddPinQuestions sections={Object.values(sections)} questions={questions} />
);

const mapStateToProps = ({
    companyAdmin: {
        templateQuestionsReducer: { questions }
    }
}) => ({
    questions: Object.values(questions)
});

export default connect(mapStateToProps)(AddPinQuestionsContainer);
