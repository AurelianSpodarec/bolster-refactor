import React from 'react';
import CompanyReportsFilters from '../presentational/CompanyReportsFilters';
import updateCompanyReportsSort from 'actions/companyAdmin/companyReports/sync/updateCompanyReportsSort';
import { connect } from 'react-redux';

const CompanyReportsFiltersContainer = ({
    updateCompanyReportsSort,
    sortString,
    onMobile
}) => {
    const sortOptions = {
        'createdOn asc': {
            text: 'Date (asc)',
            value: 'createdOn asc'
        },
        'createdOn desc': {
            text: 'Date (desc)',
            value: 'createdOn desc'
        }
    };
    return (
        <CompanyReportsFilters
            sortOptions={Object.values(sortOptions)}
            selectedOption={sortOptions[sortString]}
            handleChange={handleChange}
            onMobile={onMobile}
        />
    );

    function handleChange(_, value) {
        updateCompanyReportsSort(value);
    }
};

const mapDispatchToProps = { updateCompanyReportsSort };

const mapStateToProps = ({
    companyAdmin: { companyReportsReducer },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    sortString: companyReportsReducer.sort.sortString,
    onMobile
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsFiltersContainer);
