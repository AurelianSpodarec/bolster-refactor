import React from 'react';
import { Link } from 'react-router-dom';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import HeadquartersCompaniesTableContainer from '../containers/HeadquartersCompaniesTableContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';

const HeadquartersCompanies = ({
    handleCancelImpersonation,
    isImpersonating
}) => (
    <>
        <PageHeading title="Headquarters Companies" />
        <BlockContainer>
            <BlockHeading title="Companies" classes="w-table">
                <Link
                    to="/company/headquarters/companies/create"
                    className="button green"
                >
                    <i className="fa fa-plus" /> Add Company
                </Link>
                {isImpersonating && (
                    <button
                        className="button"
                        onClick={handleCancelImpersonation}
                    >
                        Cancel impersonation
                    </button>
                )}
            </BlockHeading>
            <HeadquartersCompaniesTableContainer />
        </BlockContainer>{' '}
    </>
);

export default HeadquartersCompanies;
