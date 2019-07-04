import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const HeadquartersCompanyListItem = ({
    company,
    impersonatedCompanyID,
    handleImpersonate,
    onMobile,
    headers
}) => (
    <tr>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[0]}</span>
            )}
            {company.name}
        </td>
        <td>
            {' '}
            {onMobile && (
                <span className="mobile-table-heading">{headers[1]}</span>
            )}
            {company.logoFile ? (
                <img src={company.logoFile} alt={`${company.name}'s logo`} />
            ) : (
                'N/A'
            )}
        </td>
        <td>
            {onMobile && (
                <span className="mobile-table-heading">{headers[2]}</span>
            )}
            <BlockButtonWrapper>
                {impersonatedCompanyID !== company.id && (
                    <button
                        type="button"
                        onClick={handleImpersonate}
                        className="button"
                    >
                        <i className="far fa-user-secret" />
                        Impersonate
                    </button>
                )}
                <button type="button" onClick={() => {}} className="button">
                    <i className="far fa-edit" />
                    ##Edit##
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default HeadquartersCompanyListItem;
