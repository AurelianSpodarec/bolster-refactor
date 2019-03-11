import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ operatives }) =>
    [...operatives].map(operative => (
        <tr key={operative.id}>
            <td className="small-text">
                {`${operative.name} - ${operative.id}`}
                <br />
                {operative.email}
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
