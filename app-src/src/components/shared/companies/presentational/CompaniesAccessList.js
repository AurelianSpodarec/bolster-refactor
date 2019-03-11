import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ companies }) =>
    [...companies].map(company => (
        <tr key={company.id}>
            <td>{company.name}</td>
            <td>
                <Link to={`/pins/${company.id}`} className="button">
                    View
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
