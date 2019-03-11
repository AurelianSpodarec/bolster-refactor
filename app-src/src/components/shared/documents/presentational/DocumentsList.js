import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ documents }) =>
    [...documents].map(document => (
        <tr key={document.id}>
            <td>{document.name}</td>
            <td>
                <Link to={`/pins/${document.id}`} className="button">
                    View
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
