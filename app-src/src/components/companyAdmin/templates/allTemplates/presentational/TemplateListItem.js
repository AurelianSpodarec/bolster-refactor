import React from 'react';
import { Link } from 'react-router-dom';

const TemplateListItem = ({ template }) => {
    return (
        <tr>
            <td>{template.name}</td>
            <td>{template.serviceName}</td>
            <td>
                <Link
                    to={`/company/templates/${template.id}`}
                    className="button"
                >
                    View
                </Link>
            </td>
        </tr>
    );
};

export default TemplateListItem;
