import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ clients }) =>
    [...clients].map(client => (
        <tr key={client.id}>
            <td>{client.name}</td>
            <td>
                <Link to={`/pins/${client.id}`} className="button">
                    View
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
