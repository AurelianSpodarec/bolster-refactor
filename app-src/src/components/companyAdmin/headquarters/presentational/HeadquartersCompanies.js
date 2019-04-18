import React from 'react';
import { Link } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import HeadquartersCompaniesTableContainer from '../containers/HeadquartersCompaniesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const HeadquartersCompanies = ({ handleCancelImpersonation }) => (
    <BlockContainer heading="Headquarters Companies">
        <BlockHeading title="Companies Table" classes="w-table">
            <button className="button" onClick={handleCancelImpersonation}>
                Cancel impersonation
            </button>
            <Link
                to="/company/headquarters/companies/create"
                className="button green"
            >
                <i className="fa fa-plus" /> Add Company
            </Link>
        </BlockHeading>
        <HeadquartersCompaniesTableContainer />
    </BlockContainer>
);

export default HeadquartersCompanies;
