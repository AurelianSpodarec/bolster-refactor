import React from 'react';

import {
    COMPANY_USER_ROLE_TYPES,
    PERMISSION_STATES,
    ACCESS_TYPES_VALUES,
} from 'constants/companyAdmin/enums';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const CompaniesAccessList = ({
    companies,
    parentId,
    handleRemovePermission,
    accessType,
    headers,
    onMobile,
}) => {
    return companies.map(company => (
        <React.Fragment key={company.companyID + parentId}>
            <tr>
                <td colSpan={2}>
                    {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
                    {company.companyName}
                </td>
                <td>
                    {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
                    {company.accessType === COMPANY_USER_ROLE_TYPES.OWNER
                        ? '(Owner)'
                        : accessType === ACCESS_TYPES_VALUES.OWNER && (
                              <>
                                  <ButtonWrapper>
                                      <LinkButton
                                          href={`${parentId}/edit-company/${company.companyID}`}
                                          icon="far fa-edit fa-fw"
                                          source="secondary"
                                          ambient="positive"
                                          extraClasses="icon-only"
                                      />
                                  </ButtonWrapper>
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
                                    <span className="mobile-table-heading">{headers[0]}</span>
                                )}{' '}
                                {'>'} {service.serviceName}{' '}
                                {service.state === PERMISSION_STATES.PENDING && <i> (Pending)</i>}
                            </td>
                            <td>
                                {!service.inherited && accessType === ACCESS_TYPES_VALUES.OWNER && (
                                    <ButtonWrapper>
                                        <ActionButton
                                            onClick={() => {
                                                handleRemovePermission(
                                                    service.permissionID,
                                                    service.serviceName,
                                                );
                                            }}
                                            icon="far fa-minus fa-fw"
                                            source="secondary"
                                            ambient="positive"
                                            extraClasses="icon-only"
                                        />
                                    </ButtonWrapper>
                                )}
                            </td>
                        </tr>
                    ),
            )}
        </React.Fragment>
    ));
};
export default CompaniesAccessList;
