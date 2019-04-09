import React from 'react';
import { Link } from 'react-router-dom';

const ClientsList = ({ location, clients, handleDeleteClientModal }) =>
    clients.map(client => (
        <tr key={`${client.id} ${client.userFirstName}`}>
            <td className="small-text">
                {`${client.userFirstName} ${client.userLastName} - (${
                    client.companyName
                })`}
            </td>
            <td>
                <Link
                    to={`${location.pathname}/edit-client/${client.id}`}
                    className="button yellow icon-only"
                >
                    <i className="far fa-pencil fa-fw" />
                </Link>
                <button
                    onClick={() => handleDeleteClientModal(client.id)}
                    to="#"
                    className="button red icon-only"
                >
                    <i className="far fa-trash-alt fa-fw" />
                </button>
            </td>
        </tr>
    ));

export default ClientsList;
