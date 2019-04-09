import React from 'react';
import { Link } from 'react-router-dom';

import {
    COMPANY_USER_ROLE_TYPES,
    PERMISSION_STATES
} from 'constants/companyAdmin/enums';

const CompaniesAccessList = ({ companies, parentId, handleShowModal }) =>
    companies.map(company => (
        <tr key={company.id}>
            <td>{company.companyName}</td>
            <td>
                {company.state === PERMISSION_STATES.PENDING && '(Pending)'}
            </td>
            <td>
                {company.accessType === COMPANY_USER_ROLE_TYPES.OWNER ? (
                    '(Owner)'
                ) : company.inherted ? (
                    '(Inherited from site)'
                ) : (
                    <>
                        <Link
                            to={`${parentId}/edit-company/${company.id}`}
                            className="button icon-only"
                        >
                            <i className="far fa-pencil fa-fw" />
                        </Link>
                        <button
                            onClick={() => handleShowModal(company.id)}
                            className="button icon-only"
                        >
                            <i className="far fa-trash-alt fa-fw" />
                        </button>
                    </>
                )}
            </td>
        </tr>
    ));

export default CompaniesAccessList;
