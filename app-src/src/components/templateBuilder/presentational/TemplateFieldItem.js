import React from 'react';

const TemplateFieldItem = () => (
    <>
        <tr key={1}>
            <td>
                <i className="fa fa-bars" />
            </td>
            <td>##Field Name##</td>
            <td>##Type##</td>
            <td>
                <input type="checkbox" />
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
