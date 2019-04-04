import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ operatives }) =>
    operatives.map(operative => {
        const {
            id,
            userFirstName: firstName,
            userLastName: lastName,
            email
        } = operative;
        return (
            <tr key={id}>
                <td className="small-text">
                    {`${firstName} ${lastName} - ${id}`}
                    <br />
                    {email}
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
        );
    });

export default DocumentsList;
