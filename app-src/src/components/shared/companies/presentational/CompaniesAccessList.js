import React from 'react';
import { Link } from 'react-router-dom';

import {
    COMPANY_USER_ROLE_TYPES,
    PERMISSION_STATES,
    ACCESS_TYPES_VALUES
} from 'constants/companyAdmin/enums';

const CompaniesAccessList = ({
    companies,
    parentId,
    handleRemovePermission,
    accessType,
    headers,
    onMobile
}) =>
    companies.map(company => (
        <React.Fragment key={company.companyID + parentId}>
            <tr>
                <td colSpan={2}>
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[0]}
                        </span>
                    )}
                    {company.companyName}
                </td>
                <td>
                    {onMobile && (
                        <span className="mobile-table-heading">
                            {headers[2]}
                        </span>
                    )}
                    {company.accessType === COMPANY_USER_ROLE_TYPES.OWNER
                        ? '(Owner)'
                        : accessType === ACCESS_TYPES_VALUES.OWNER && (
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
                (service, i) =>
                    !!service && (
                        <tr key={service.serviceID + company.companyID + i}>
                            <td colSpan={2}>
                                {onMobile && (
                                    <span className="mobile-table-heading">
                                        {headers[0]}
                                    </span>
                                )}{' '}
                                {'>'} {service.serviceName}{' '}
                                {service.state ===
                                    PERMISSION_STATES.PENDING && (
                                    <i> (Pending)</i>
                                )}
                            </td>
                            <td>
                                {!service.inherited &&
                                    accessType ===
                                        ACCESS_TYPES_VALUES.OWNER && (
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
export default CompaniesAccessList;
