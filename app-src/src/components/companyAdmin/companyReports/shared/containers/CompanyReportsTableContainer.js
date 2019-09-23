import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';
import retryReport from 'actions/companyAdmin/reports/async/retryReport';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import fetchCompanyReportsFull from 'actions/companyAdmin/companyReports/async/fetchCompanyReportsFull';

const CompanyReportsTableContainer = ({
    isFetching,
    error,
    companyReports,
    sortString = '',
    onMobile,
    retryReport,
    fetchCompanyReports,
    fetchCompanyReportsFull,
    fetchStatus
}) => {
    return (
        <CompanyReportsTable
            headers={['Name', 'Created By', 'Type', 'Status', 'Created On', 'Completed on', '']}
            isFetching={isFetching}
            error={error}
            companyReports={_getSortedQueue()}
            onMobile={onMobile}
            retryCompanyReport={id => retryCompanyReport(id)}
            fetchCompanyReportsFull={fetchCompanyReportsFull}
            fetchStatus={fetchStatus}
        />
    );

    function _getSortedQueue() {
        const [fieldName, sortOrder] = sortString.split(' ');
        return sortArrayByKeyAndOrder(companyReports, fieldName, sortOrder);
    }

    function retryCompanyReport(id) {
        retryReport(id).then(fetchCompanyReports);
    }
};

const mapStateToProps = ({
    companyAdmin: {
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

const mapDispatchToProps = { retryReport, fetchCompanyReports, fetchCompanyReportsFull };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsTableContainer);
