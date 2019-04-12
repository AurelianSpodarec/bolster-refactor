import React from 'react';
import { QUESTION_TYPES } from 'constants/shared/templateBuilder';

const TemplateSectionQuestion = ({ question }) => {
    return (
        <tr key={question.id}>
            <td>{question.name}</td>
            <td>{question.isHidden ? 'Hidden' : 'Not hidden'}</td>
            <td>{question.isRequired ? 'Required' : 'Not required'}</td>
            <td>{question.isPrefill ? 'Prefilled' : 'Not prefilled'}</td>
            <td>{QUESTION_TYPES[question.type]}</td>
            <td>{question.groupKey}</td>
            <td>{''}</td>
        </tr>
    );
};

export default TemplateSectionQuestion;
