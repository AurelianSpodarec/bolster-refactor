import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder, getSelectedCompanyForClient } from 'helpers/generic';
import fetchClientCompanyReportsFull from 'actions/client/reports/queue/async/fetchClientCompanyReportsFull';

const CompanyReportsTableContainer = ({
    isFetching,
    error,
    companyReports,
    sortString = '',
    onMobile,
    fetchClientCompanyReportsFull,
    fetchStatus
}) => {
    return (
        <CompanyReportsTable
            headers={['Name', 'Type', 'Details', 'Status', 'Created On', 'Completed on', '']}
            isFetching={isFetching}
            error={error}
            companyReports={_getSortedQueue()}
            onMobile={onMobile}
            fetchClientCompanyReportsFull={() =>
                fetchClientCompanyReportsFull(getSelectedCompanyForClient())
            }
            fetchStatus={fetchStatus}
        />
    );

    function _getSortedQueue() {
        const fieldAndSort = sortString.split(' ');

        const fieldName = fieldAndSort[0];
        const sortOrder = fieldAndSort[1];

        if (sortOrder === 'asc') {
            return sortArrayByKeyAndOrder(companyReports, fieldName, true);
        } else {
            return sortArrayByKeyAndOrder(companyReports, fieldName, false);
        }
    }
};

const mapStateToProps = ({
    client: {
        companyReportsReducer: {
            companyReports,
            error,
            isFetching,
            sort: { sortString },
            fetchStatus
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
    onMobile,
    fetchStatus
});

const mapDispatchToProps = { fetchClientCompanyReportsFull };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsTableContainer);
