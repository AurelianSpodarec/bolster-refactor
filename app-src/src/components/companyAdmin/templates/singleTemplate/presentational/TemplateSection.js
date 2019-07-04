import React from 'react';
import TemplateSectionQuestionContainer from '../containers/TemplateSectionQuestionContainer';

const TemplateSection = ({ questions = [], headers }) =>
    !questions.length ? (
        <tr>
            <td>No questions for this section.</td>
        </tr>
    ) : (
        questions.map(question => (
            <TemplateSectionQuestionContainer
                question={question}
                key={question.id}
                headers={headers}
            />
        ))
    );

export default TemplateSection;
