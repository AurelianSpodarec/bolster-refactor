import React from 'react';

const PinQuestion = ({ questions }) =>
    questions.map(question => (
        <div className="pin-details-section size-lg-12">
            <h4 className="title">{question.name}</h4>
            <p>Question...</p>
        </div>
    ));

export default PinQuestion;
