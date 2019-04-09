import React from 'react';
import { Link } from 'react-router-dom';

import {
    COMPANY_USER_ROLE_TYPES,
    PERMISSION_STATES
} from 'constants/companyAdmin/enums';

const CompaniesAccessList = ({ companies, parentId, handleShowModal }) =>
    companies.map(company => (
        <tr key={company.id}>
            <td className="small-text">{company.companyName}</td>
            <td className="small-text">
                {company.state === PERMISSION_STATES.PENDING && '(Pending)'}
            </td>
            <td className="small-text">
                {company.accessType === COMPANY_USER_ROLE_TYPES.OWNER ? (
                    '(Owner)'
                ) : company.inherted ? (
                    '(Inherited from site)'
                ) : (
                    <>
                        <Link
                            to={`${parentId}/edit-company/${company.id}`}
                            className="button yellow icon-only"
                        >
                            <i className="far fa-pencil fa-fw" />
                        </Link>
                        <button
                            onClick={() => handleShowModal(company.id)}
                            className="button red icon-only"
                        >
                            <i className="far fa-trash-alt fa-fw" />
                        </button>
                    </>
                )}
            </td>
        </tr>
    ));

export default CompaniesAccessList;
