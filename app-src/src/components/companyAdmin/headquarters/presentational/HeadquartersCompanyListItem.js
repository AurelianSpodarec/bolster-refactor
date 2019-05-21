import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const HeadquartersCompanyListItem = ({
    company,
    impersonatedCompanyID,
    handleImpersonate
}) => (
    <tr>
        <td>{company.name}</td>
        <td>
            {company.logoFile && (
                <img src={company.logoFile} alt={`${company.name}'s logo`} />
            )}
        </td>
        <td>
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
