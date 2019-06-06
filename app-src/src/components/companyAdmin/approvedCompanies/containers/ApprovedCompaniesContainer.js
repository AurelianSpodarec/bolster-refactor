import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import fetchApprovedCompanies from 'actions/companyAdmin/approvedCompanies/async/fetchApprovedCompanies';

import ApprovedCompanies from '../presentational/ApprovedCompanies';

const ApprovedCompaniesContainer = () => {
    useEffect(() => {
        fetchApprovedCompanies();
    }, []);
    return <ApprovedCompanies />;
};

const mapDispatchToProps = dispatch => ({
    fetchApprovedCompanies: () => {
        dispatch(fetchApprovedCompanies());
    }
});

export default connect(
    null,
    mapDispatchToProps
)(ApprovedCompaniesContainer);
