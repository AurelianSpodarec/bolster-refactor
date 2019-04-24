import React from 'react';
import { QUESTION_TYPES } from 'constants/shared/templateBuilder';

const TemplateSectionQuestion = ({
    question: {
        id,
        name,
        isHidden,
        isRequired,
        isPrefill,
        type,
        canCompanyEdit
    },
    selectQuestion
}) => (
    <tr key={id}>
        <td>{name}</td>
        <td>{QUESTION_TYPES[type]}</td>
        <td>{isRequired ? 'Required' : 'Not required'}</td>
        <td>
            <button className="button" onClick={() => selectQuestion(id)}>
                {canCompanyEdit ? (
                    <span>
                        <i className="fal fa-pencil" />
                        Info/edit
                    </span>
                ) : (
                    <span>Info</span>
                )}
            </button>
        </td>
    </tr>
);

export default TemplateSectionQuestion;
