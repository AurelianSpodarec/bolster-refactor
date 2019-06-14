import React from 'react';
import { connect } from 'react-redux';
import PinQuestion from '../presentational/PinQuestion';

const PinQuestionsContainer = ({ relevantQuestions, pinHistory }) => (
    <PinQuestion questions={relevantQuestions} pinHistory={pinHistory} />
);

const mapStateToProps = (
    { client: { templateQuestionsReducer } },
    { sectionID }
) => ({
    relevantQuestions: Object.values(templateQuestionsReducer.questions).filter(
        ({ templateSectionID }) => templateSectionID === sectionID
    )
});

export default connect(mapStateToProps)(PinQuestionsContainer);
