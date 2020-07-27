import React from 'react';

import QuestionContainer from '../containers/QuestionContainer';

const QuestionList = ({ sectionUUID, questions, moveQuestion, hovered }) => (
    <div className="question-list" style={hovered ? { maxHeight: '1px', overflow: 'hidden' } : {}}>
        <div className="question-header size-lg-12">
            <p className="size-lg-3">Name</p>
            <p className="size-lg-3">Type</p>
            <p className="size-lg-2">Required</p>
            <p className="size-lg-2">Hidden</p>
        </div>
        {questions.map((question, i) => (
            <QuestionContainer
                key={question.uuid}
                index={i}
                sectionUUID={sectionUUID}
                question={question}
                moveQuestion={moveQuestion}
            />
        ))}
    </div>
);

export default QuestionList;
