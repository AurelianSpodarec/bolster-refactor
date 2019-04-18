import React from 'react';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const HeadquartersCompanyListItem = ({ company }) => (
    <tr>
        <td>{company.name}</td>
        <td>
            {company.logoFile && (
                <img src={company.logoFile} alt={`${company.name}'s logo`} />
            )}
        </td>
        <td>
            <BlockButtonWrapper>
                <button type="button" onClick={() => {}} className="button">
                    <i className="far fa-edit" />
                    ##Edit##
                </button>
                <button type="button" onClick={() => {}} className="button">
                    <i className="far fa-user-secret" />
                    ##Impersonate##
                </button>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default HeadquartersCompanyListItem;
