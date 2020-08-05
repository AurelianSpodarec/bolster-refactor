import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import postCompanyAddress from 'actions/superAdmin/companies/async/postCompanyAddress';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';

import EditCompanyAddressModal from '../presentational/EditCompanyAddressModal';

const EditCompanyAddressModalContainer = ({
    company,
    company: { addressLine1, addressLine2, county, postcode, town, country },
    isPosting,
    error,
    hideModal,
    postCompanyAddress,
}) => {
    const [companyAddress, setCompanyAddress] = useState({
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        county: county,
        postcode: postcode,
        town: town,
        country,
    });

    return (
        <EditCompanyAddressModal
            company={company}
            companyAddress={companyAddress}
            handleSubmit={_handleSubmit}
            handleChange={_handleChange}
            isPosting={isPosting}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            error={error}
        />
    );

    function _handleChange(name, value) {
        setCompanyAddress({ ...companyAddress, [name]: value });
    }

    function _handleSubmit() {
        postCompanyAddress(company.id, companyAddress).then(() => {
            hideModal();
        });
    }
};

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { isFetching, isPosting, error },
    },
}) => ({
    isFetching,
    isPosting,
    error,
});

const mapDispatchToProps = {
    hideModal,
    postCompanyAddress,
    fetchAllCompanies,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditCompanyAddressModalContainer),
);
