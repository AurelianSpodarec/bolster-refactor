import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ operatives }) =>
    [...operatives].map(operative => (
        <tr key={operative.id}>
            <td>{operative.name}</td>
            <td>
                <Link to={`/pins/${operative.id}`} className="button">
                    View
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
