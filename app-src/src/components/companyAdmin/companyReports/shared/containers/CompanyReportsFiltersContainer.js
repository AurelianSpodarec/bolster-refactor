import React from 'react';
import CompanyReportsFilters from '../presentational/CompanyReportsFilters';
import updateCompanyReportsSort from 'actions/companyAdmin/companyReports/sync/updateCompanyReportsSort';
import { connect } from 'react-redux';

const CompanyReportsFiltersContainer = ({
    updateCompanyReportsSort,
    sortString
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
        />
    );

    function handleChange(_, value) {
        updateCompanyReportsSort(value);
    }
};

const mapDispatchToProps = dispatch => ({
    updateCompanyReportsSort: sortString =>
        dispatch(updateCompanyReportsSort(sortString))
});

const mapStateToProps = ({ superAdmin: { companyReportsReducer } }) => ({
    sortString: companyReportsReducer.sort.sortString
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsFiltersContainer);
