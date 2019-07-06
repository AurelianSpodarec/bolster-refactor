import React from 'react';
import { QUESTION_TYPES } from 'constants/shared/templateBuilder';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const TemplateSectionQuestion = ({
    question: { id, name, isRequired, type, canCompanyEdit },
    selectQuestion,
    onMobile,
    headers
}) => (
    <tr key={id}>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {name}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {QUESTION_TYPES[type]}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            {isRequired ? 'Required' : 'Not required'}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[3]}</span>
            )}
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
