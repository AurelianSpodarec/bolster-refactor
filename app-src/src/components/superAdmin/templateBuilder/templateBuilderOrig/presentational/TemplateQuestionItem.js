import React from 'react';
import { QUESTION_TYPES } from 'constants/superAdmin/templateBuilder';

const TemplateQuestionItem = ({
    question,
    showEditQuestion,
    deleteQuestion,
    isPrereq
}) => (
    <>
        <tr>
            <td>
                <i className="fa fa-bars" />
            </td>
            <td>{question.name}</td>
            <td>{QUESTION_TYPES[question.questionType]}</td>
            <td>
                <input type="checkbox" readOnly checked={question.isRequired} />
            </td>
            <td>
                <button
                    className="button"
                    type="edit"
                    onClick={showEditQuestion}
                >
                    Edit
                </button>
                {!isPrereq && (
                    <button
                        className="button red icon-only"
                        onClick={() => deleteQuestion(question.uuid)}
                    >
                        <i className="fa fa-times" />
                    </button>
                )}
            </td>
        </tr>
    </>
);

export default TemplateQuestionItem;
