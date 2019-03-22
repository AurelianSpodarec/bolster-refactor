import React from 'react';
import TemplateFieldItem from './TemplateFieldItem';

const TemplateFieldList = ({ questions }) =>
    questions.map(question => (
        <TemplateFieldItem key={question.uuid} question={question} />
    ));

export default TemplateFieldList;
