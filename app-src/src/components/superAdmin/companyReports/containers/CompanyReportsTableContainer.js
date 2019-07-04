import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';

const CompanyReportsTableContainer = ({
    companyReports,
    error,
    isFetching,
    sortString,
    onMobile
}) => {
    return (
        <CompanyReportsTable
            companyReports={_getSortedQueue()}
            error={error}
            isFetching={isFetching}
            headers={['Name', 'Status', 'Created On', 'Completed on', '']}
            onMobile={onMobile}
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
    },
    shared: {
        mobileReducer: { onMobile }
    }
}) => ({
    companyReports: Object.values(companyReports),
    error,
    isFetching,
    sortString,
    onMobile
});

export default connect(mapStateToProps)(CompanyReportsTableContainer);
