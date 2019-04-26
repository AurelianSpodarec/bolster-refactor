import React from 'react';
import { QUESTION_TYPES } from 'constants/shared/templateBuilder';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const TemplateSectionQuestion = ({
    question: { id, name, isRequired, type, canCompanyEdit },
    selectQuestion
}) => (
    <tr key={id}>
        <td>{name}</td>
        <td>{QUESTION_TYPES[type]}</td>
        <td>{isRequired ? 'Required' : 'Not required'}</td>
        <td>
            <ButtonContainer handleClick={() => selectQuestion(id)}>
                {canCompanyEdit ? (
                    <span>
                        <i className="fal fa-pencil" />
                        Info/edit
                    </span>
                ) : (
                    <span>Info</span>
                )}
            </ButtonContainer>
        </td>
    </tr>
);

export default TemplateSectionQuestion;
