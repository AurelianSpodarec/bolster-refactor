import React from 'react';
import PinAnswersContainer from '../containers/PinAnswersContainer';

const PinQuestion = ({ questions, pinHistory }) =>
    questions.map(question => (
        <PinAnswersContainer
            key={question.id}
            question={question}
            questionID={question.id}
            questionType={question.type}
            pinHistory={pinHistory}
        />
    ));

export default PinQuestion;
