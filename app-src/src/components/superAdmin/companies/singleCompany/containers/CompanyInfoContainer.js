import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompanyInfo from '../presentational/CompanyInfo';

const CompanyInfoContainer = ({ company, isFetching, error }) => (
    <BlockContainer isFetching={isFetching} error={error} isEmpty={!company}>
        <div className="size-lg-6 size-md-12">
            <BlockHeading title="Company Info" />
        </div>
        <CompanyInfo company={company} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        superAdmin: {
            companiesReducer: { companies, isFetching, error }
        }
    },
    { match: { params } }
) => ({
    companyID: params.id,
    company: companies[params.id],
    isFetching,
    error
});

export default withRouter(connect(mapStateToProps)(CompanyInfoContainer));
