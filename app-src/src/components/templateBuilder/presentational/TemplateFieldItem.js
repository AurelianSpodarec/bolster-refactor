import React from 'react';

const TemplateFieldItem = ({ question }) => (
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
                <button className="button" type="edit">
                    Edit
                </button>
                <button className="button red icon-only">
                    <i className="fa fa-times" />
                </button>
            </td>
        </tr>
    </>
);

export default TemplateFieldItem;
