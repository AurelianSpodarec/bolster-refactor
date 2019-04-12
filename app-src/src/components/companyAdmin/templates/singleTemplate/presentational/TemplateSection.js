import React from 'react';
import TemplateSectionQuestionContainer from '../containers/TemplateSectionQuestionContainer';

const TemplateSection = ({ questions = [] }) =>
    !questions.length ? (
        <tr>No questions for this section.</tr>
    ) : (
        questions.map(question => (
            <TemplateSectionQuestionContainer
                question={question}
                key={question.id}
            />
        ))
    );

export default TemplateSection;
