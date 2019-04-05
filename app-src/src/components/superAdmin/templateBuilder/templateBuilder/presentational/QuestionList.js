import React from 'react';

import QuestionContainer from '../containers/QuestionContainer';

const QuestionList = ({ sectionUUID, questions, moveQuestion }) =>
    questions.map((question, i) => (
        <QuestionContainer
            key={question.uuid}
            index={i}
            sectionUUID={sectionUUID}
            question={question}
            moveQuestion={moveQuestion}
        />
    ));

export default QuestionList;
