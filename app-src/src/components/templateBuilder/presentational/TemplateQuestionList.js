import React from 'react';
import TemplateQuestionItemContainer from '../containers/TemplateQuestionItemContainer';

const TemplateQuestionList = ({ questions }) =>
    questions.map(question => (
        <TemplateQuestionItemContainer
            key={question.uuid}
            question={question}
        />
    ));

export default TemplateQuestionList;
