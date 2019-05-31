import React from 'react';

import CompanySelectionHeader from './CompanySelectionHeader';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CompanySelectionContainer from '../containers/CompanySelectionContainer';

const CompanySelection = () => (
    <>
        <CompanySelectionHeader />
        <div className="full-container container">
            <div id="page-area" className="full">
                <div className="auth size-lg-12">
                    <PageHeading title="Select Company" />
                    <BlockContainer>
                        <CompanySelectionContainer />
                    </BlockContainer>
                </div>
            </div>
        </div>
    </>
);

export default CompanySelection;
