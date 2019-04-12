import React from 'react';
import { Link } from 'react-router-dom';

const TemplateListItem = ({ template: { name, serviceName, id } }) => (
    <tr>
        <td>{name}</td>
        <td>{serviceName}</td>
        <td>
            <Link to={`/company/templates/${id}`} className="button">
                View
            </Link>
        </td>
    </tr>
);

export default TemplateListItem;
