import React from 'react';
import { Link } from 'react-router-dom';

import {
    COMPANY_USER_ROLE_TYPES,
    PERMISSION_STATES,
    ACCESS_TYPES
} from 'constants/companyAdmin/enums';

const CompaniesAccessListSmall = ({
    companies,
    parentId,
    handleRemovePermission
}) =>
    companies.map(company => (
        <React.Fragment key={company.companyID + parentId}>
            <tr>
                <td>
                    {company.companyName} <br />
                    {!!company.allAccess && <i>(access to all services)</i>}
                </td>

                <td>
                    {company.accessType === COMPANY_USER_ROLE_TYPES.OWNER ? (
                        '(Owner)'
                    ) : (
                        <>
                            <Link
                                to={`${parentId}/add-permissions/${
                                    company.companyID
                                }`}
                                className="button icon-only green"
                            >
                                <i className="far fa-plus fa-fw" />
                            </Link>
                        </>
                    )}
                </td>
            </tr>
            {company.services.map(
                service =>
                    !!service && (
                        <tr key={service.serviceID + company.id}>
                            <td>
                                {service.state ===
                                    PERMISSION_STATES.PENDING && (
                                    <i>
                                        (Pending) <br />
                                    </i>
                                )}
                                {service.serviceName} <br />
                                <i>({ACCESS_TYPES[service.accessType]})</i>
                            </td>

                            <td>
                                {!service.inherited && (
                                    <button
                                        onClick={() => {
                                            handleRemovePermission(
                                                service.permissionID,
                                                service.serviceName
                                            );
                                        }}
                                        className="button red icon-only"
                                    >
                                        <i className="far fa-minus fa-fw" />
                                    </button>
                                )}
                            </td>
                        </tr>
                    )
            )}
        </React.Fragment>
    ));

export default CompaniesAccessListSmall;
