import React from 'react';

const TemplateSection = ({ questions }) =>
    questions.length ? (
        questions.map(question => (
            <tr key={question.id}>
                <td>{question.name}</td>
                <td>{question.isHidden ? 'Hidden' : 'Not hidden'}</td>
                <td>{question.isRequired ? 'Required' : 'Not required'}</td>
                <td>{question.isPrefill ? 'Prefilled' : 'Not prefilled'}</td>
                <td>{question.type}</td>
                <td>{question.groupKey}</td>
                <td>{question.configuration.charLimit}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td>No questions for this section.</td>
        </tr>
    );

export default TemplateSection;
