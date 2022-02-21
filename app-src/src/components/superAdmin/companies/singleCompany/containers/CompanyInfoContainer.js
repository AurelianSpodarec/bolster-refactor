import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import toggleCompanyOnClientList from 'actions/superAdmin/companies/async/toggleCompanyOnClientList';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CompanyInfo from '../presentational/CompanyInfo';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import {
    ADMIN_EDIT_COMPANY_ADDRESS,
    EDIT_FREE_CREDIT,
    EDIT_JOB_REF_DROPDOWN,
} from 'constants/shared/modalTypes';

const CompanyInfoContainer = ({
    company,
    isFetching,
    isPosting,
    error,
    toggleCompanyOnClientList,
    showModal,
}) => {
    return (
        <BlockContainer isFetching={isFetching} error={error} isEmpty={!company}>
            <div className="size-lg-6 size-md-12">
                <BlockHeading title="Company Info"></BlockHeading>
            </div>
            <CompanyInfo
                company={company}
                isPosting={isPosting}
                handleToggleClientList={handleToggleClientList}
                handleShowEditAddressModal={handleShowEditAddressModal}
                handleShowEditFreeCreditModal={handleShowEditFreeCreditModal}
                handleShowEditJobRefDropdownModal={handleShowEditJobRefDropdownModal}
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
    function handleShowEditAddressModal() {
        showModal(ADMIN_EDIT_COMPANY_ADDRESS, { company });
    }
    function handleShowEditFreeCreditModal() {
        showModal(EDIT_FREE_CREDIT, { company });
    }
    function handleShowEditJobRefDropdownModal() {
        showModal(EDIT_JOB_REF_DROPDOWN, { company });
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
    showModal,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyInfoContainer));
