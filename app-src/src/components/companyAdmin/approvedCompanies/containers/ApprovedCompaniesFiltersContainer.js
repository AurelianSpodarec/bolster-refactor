import React from 'react';

import updateApprovedCompaniesFilters from 'actions/companyAdmin/approvedCompanies/sync/updateApprovedCompaniesFilters';

import { connect } from 'react-redux';

import ApprovedCompaniesFilters from '../presentational/ApprovedCompaniesFilters';

// TODO: add filters

const ApprovedCompaniesFiltersContainer = ({
    filters: { name },
    updateApprovedCompaniesFilters
}) => {
    const handleChange = (name, value) => {
        updateApprovedCompaniesFilters(name, value);
    };

    return <ApprovedCompaniesFilters handleChange={handleChange} name={name} />;
};

const mapStateToProps = ({
    companyAdmin: {
        approvedCompaniesReducer: { filters }
    }
}) => ({
    filters
});

const mapDispatchToProps = dispatch => ({
    updateApprovedCompaniesFilters: (name, value) => {
        dispatch(updateApprovedCompaniesFilters(name, value));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApprovedCompaniesFiltersContainer);
