import React from 'react';
import { EDIT_TEMPLATE_QUESTION } from 'constants/modalTypes';

const TemplateQuestionItem = ({ question, showModal }) => (
    <>
        <tr>
            <td>
                <i className="fa fa-bars" />
            </td>
            <td>{question.name}</td>
            <td>{question.questionType}</td>
            <td>
                <input type="checkbox" readOnly checked={question.isRequired} />
            </td>
            <td>
                <button
                    className="button"
                    type="edit"
                    onClick={() => {
                        showModal(EDIT_TEMPLATE_QUESTION, {
                            uuid: question.uuid
                        });
                    }}
                >
                    Edit
                </button>
                <button className="button red icon-only">
                    <i className="fa fa-times" />
                </button>
            </td>
        </tr>
    </>
);

export default TemplateQuestionItem;
