import React from 'react';
import { Link } from 'react-router-dom';

const OperativesList = ({
    operatives,
    documentID,
    handleDeleteOperativeModal
}) =>
    operatives.map(operative => {
        const {
            id,
            userFirstName: firstName,
            userLastName: lastName,
            email
        } = operative;
        return (
            <tr key={id}>
                <td>
                    {`${firstName} ${lastName} - ${id}`}
                    <br />
                    {email}
                </td>
                <td>
                    <Link
                        to={`/company/drawings/${documentID}/edit-operative/${id}`}
                        className="button yellow icon-only"
                    >
                        <i className="far fa-pencil fa-fw" />
                    </Link>
                    <button
                        onClick={() => handleDeleteOperativeModal(operative)}
                        to="#"
                        className="button red icon-only"
                    >
                        <i className="far fa-trash-alt fa-fw" />
                    </button>
                </td>
            </tr>
        );
    });

export default OperativesList;
