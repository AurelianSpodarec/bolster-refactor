import React from 'react';
import { Link } from 'react-router-dom';

const DocumentsList = ({ companies }) =>
    companies.map(company => (
        <tr key={company.id}>
            <td>{company.name}</td>
            <td>
                {company.isInherited ? (
                    '(inherited from site)'
                ) : (
                    <>
                        <Link to="#" className="button icon-only">
                            <i className="far fa-pencil fa-fw" />
                        </Link>
                        <Link to="#" className="button icon-only">
                            <i className="far fa-trash-alt fa-fw" />
                        </Link>
                    </>
                )}
            </td>
        </tr>
    ));

export default DocumentsList;
