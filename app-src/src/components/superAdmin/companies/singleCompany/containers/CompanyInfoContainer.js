import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import toggleCompanyOnClientList from 'actions/superAdmin/companies/async/toggleCompanyOnClientList';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompanyInfo from '../presentational/CompanyInfo';

const CompanyInfoContainer = ({
    company,
    isFetching,
    isPosting,
    error,
    toggleCompanyOnClientList,
}) => {
    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={!company}>
            <div className="size-lg-6 size-md-12">
                <BlockHeading title="Company Info" />
            </div>
            <CompanyInfo
                company={company}
                isPosting={isPosting}
                handleToggleClientList={handleToggleClientList}
            />
        </BlockContainer>
    );

    function handleToggleClientList() {
        const postBody = {
            ID: company.id,
            hideOnClientList: !company.hideOnClientList,
        };

        toggleCompanyOnClientList(postBody);
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            companiesReducer: { companies, isFetching, isPosting, error },
        },
    },
    { match: { params } },
) => ({
    companyID: params.id,
    company: companies[params.id],
    isFetching,
    isPosting,
    error,
});

const mapDispatchToProps = {
    toggleCompanyOnClientList,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyInfoContainer));
