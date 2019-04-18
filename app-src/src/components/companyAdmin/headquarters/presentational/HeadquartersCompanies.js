import React from 'react';
import { Link } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import HeadquartersCompaniesTableContainer from '../containers/HeadquartersCompaniesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const HeadquartersCompanies = () => (
    <BlockContainer heading="Headquarters Companies">
        <BlockHeading title="Companies Table" classes="w-table">
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
