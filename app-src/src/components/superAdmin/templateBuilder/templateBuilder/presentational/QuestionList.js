import React from 'react';

import QuestionContainer from '../containers/QuestionContainer';

const QuestionList = ({ sectionUuid, questions, moveQuestion }) =>
    questions.map((question, i) => (
        <QuestionContainer
            key={question.uuid}
            index={i}
            sectionUuid={sectionUuid}
            question={question}
            moveQuestion={moveQuestion}
        />
    ));

export default QuestionList;
