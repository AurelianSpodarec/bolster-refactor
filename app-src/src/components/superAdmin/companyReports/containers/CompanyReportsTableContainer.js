import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';

const CompanyReportsTableContainer = ({
    companyReports,
    error,
    isFetching,
    sortString
}) => {
    return (
        <CompanyReportsTable
            companyReports={_getSortedQueue()}
            error={error}
            isFetching={isFetching}
            headers={['Name', 'Status', 'Created On', '']}
        />
    );
    function _getSortedQueue() {
        const [fieldName, sortOrder] = sortString.split(' ');
        return sortArrayByKeyAndOrder(companyReports, fieldName, sortOrder);
    }
};
const mapStateToProps = ({
    superAdmin: {
        companyReportsReducer: {
            companyReports,
            error,
            isFetching,
            sort: { sortString }
        }
    }
}) => ({
    companyReports: Object.values(companyReports),
    error,
    isFetching,
    sortString
});

export default connect(mapStateToProps)(CompanyReportsTableContainer);
