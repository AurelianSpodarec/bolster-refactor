import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ clients }) =>
    clients.map(client => (
        <tr key={client.id}>
            <td className="small-text">
                {`${client.name} - (${client.company})`}
                <br />
                {client.types.join(', ')}
            </td>
            <td>
                <Link to="#" className="button icon-only">
                    <i className="far fa-pencil fa-fw" />
                </Link>
                <Link to="#" className="button icon-only">
                    <i className="far fa-trash-alt fa-fw" />
                </Link>
            </td>
        </tr>
    ));

export default DocumentsList;
