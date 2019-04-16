import React from 'react';
import PinAnswersContainer from '../containers/PinAnswersContainer';

const PinQuestion = ({ questions, pinHistory }) =>
    questions.map(question => (
        <div className="field-output no-h-padding size-lg-12" key={question.id}>
            <label className="title">{question.name}</label>
            <PinAnswersContainer
                questionID={question.id}
                questionType={question.type}
                pinHistory={pinHistory}
            />
        </div>
    ));

export default PinQuestion;
