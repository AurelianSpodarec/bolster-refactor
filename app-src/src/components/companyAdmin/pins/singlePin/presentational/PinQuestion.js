import React from 'react';
import PinAnswersContainer from '../containers/PinAnswersContainer';

const PinQuestion = ({ questions }) =>
    questions.map(question => (
        <div className="pin-details-section size-lg-12" key={question.id}>
            <h4 className="title">{question.name}</h4>
            <PinAnswersContainer
                questionID={question.id}
                questionType={question.type}
            />
        </div>
    ));

export default PinQuestion;
