import React from 'react';
import PinAnswersContainer from '../containers/PinAnswersContainer';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

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
