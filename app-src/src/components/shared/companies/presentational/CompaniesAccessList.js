import React from 'react';
import { Link } from 'react-router-dom';

import { PERMISSION_STATES as STATE } from 'constants/companyAdmin/enums';

const CompaniesAccessList = ({ companies, parentId }) =>
    companies.map(company => (
        <tr key={company.id}>
            <td>{company.companyName}</td>
            <td>
                {company.state === STATE.ACCEPTED
                    ? 'Accepted'
                    : company.state === STATE.PENDING
                    ? 'Pending'
                    : company.state === STATE.REJECTED
                    ? 'Rejected'
                    : ''}
            </td>
            <td>
                {company.isInherited ? (
                    '(inherited from site)'
                ) : (
                    <>
                        <Link
                            to={`${parentId}/edit-company/${company.companyID}`}
                            className="button icon-only"
                        >
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

export default CompaniesAccessList;
