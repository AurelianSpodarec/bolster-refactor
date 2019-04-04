import React from 'react';
import { Link } from 'react-router-dom';

const ClientsList = ({ location, clients }) =>
    clients.map(client => (
        <tr key={`${client.id} ${client.userFirstName}`}>
            <td className="small-text">
                {`${client.userFirstName} ${client.userLastName} - (${
                    client.companyName
                })`}
            </td>
            <td>
                <Link
                    to={`${location.pathname}/client/${client.id}/edit`}
                    className="button icon-only"
                >
                    <i className="far fa-pencil fa-fw" />
                </Link>
                <Link to="#" className="button icon-only">
                    <i className="far fa-trash-alt fa-fw" />
                </Link>
            </td>
        </tr>
    ));

export default ClientsList;
