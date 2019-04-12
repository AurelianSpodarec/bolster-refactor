import React from 'react';
import { QUESTION_TYPES } from 'constants/shared/templateBuilder';

const TemplateSectionQuestion = ({
    question: { id, name, isHidden, isRequired, isPrefill, type, groupKey }
}) => (
    <tr key={id}>
        <td>{name}</td>
        <td>{isHidden ? 'Hidden' : 'Not hidden'}</td>
        <td>{isRequired ? 'Required' : 'Not required'}</td>
        <td>{isPrefill ? 'Prefilled' : 'Not prefilled'}</td>
        <td>{QUESTION_TYPES[type]}</td>
        <td>{groupKey}</td>
        <td>{''}</td>
    </tr>
);

export default TemplateSectionQuestion;
