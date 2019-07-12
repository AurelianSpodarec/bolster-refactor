import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';
import retryReport from 'actions/superAdmin/companyReports/async/retryReport';
import fetchCompanyReportsQueue from 'actions/superAdmin/companyReports/async/fetchCompanyReportsQueue';

const CompanyReportsTableContainer = ({
    companyReports,
    error,
    isFetching,
    sortString,
    onMobile,
    retryReport,
    fetchCompanyReportsQueue
}) => {
    return (
        <CompanyReportsTable
            companyReports={_getSortedQueue()}
            error={error}
            isFetching={isFetching}
            headers={[
                'Company',
                'Report Name',
                'User Email',
                'Status',
                'Created On',
                'Completed on',
                ''
            ]}
            onMobile={onMobile}
            retryCompanyReport={id => retryCompanyReport(id)}
        />
    );
    function _getSortedQueue() {
        const [fieldName, sortOrder] = sortString.split(' ');
        return sortArrayByKeyAndOrder(companyReports, fieldName, sortOrder);
    }
    function retryCompanyReport(id) {
        retryReport(id).then(fetchCompanyReportsQueue);
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

const mapDispatchToProps = { fetchCompanyReportsQueue, retryReport };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsTableContainer);
