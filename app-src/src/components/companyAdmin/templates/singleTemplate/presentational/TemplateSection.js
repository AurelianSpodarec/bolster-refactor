import React from 'react';
import TemplateSectionQuestionContainer from '../containers/TemplateSectionQuestionContainer';

const TemplateSection = ({ questions }) =>
    questions.length ? (
        questions.map(({ id, ...question }) => (
            <TemplateSectionQuestionContainer question={question} key={id} />
        ))
    ) : (
        <tr>
            <td>No questions for this section.</td>
        </tr>
    );

export default TemplateSection;
