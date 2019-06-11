import React from 'react';
import CompanyReportsFilters from '../presentational/CompanyReportsFilters';
import updateClientCompanyReportsSort from 'actions/client/reports/queue/sync/updateClientCompanyReportsSort';
import { connect } from 'react-redux';

const CompanyReportsFiltersContainer = ({
    updateClientCompanyReportsSort,
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
        updateClientCompanyReportsSort(value);
    }
};

const mapDispatchToProps = dispatch => ({
    updateClientCompanyReportsSort: sortString =>
        dispatch(updateClientCompanyReportsSort(sortString))
});

const mapStateToProps = ({ client: { companyReportsReducer } }) => ({
    sortString: companyReportsReducer.sort.sortString
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsFiltersContainer);
