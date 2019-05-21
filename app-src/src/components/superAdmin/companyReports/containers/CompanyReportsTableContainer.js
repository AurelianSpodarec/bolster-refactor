import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';

const CompanyReportsTableContainer = ({
    companyReports,
    error,
    isFetching
}) => (
    <CompanyReportsTable
        companyReports={companyReports}
        error={error}
        isFetching={isFetching}
        headers={['Name', 'Status', 'Created On', '']}
    />
);

const mapStateToProps = ({
    superAdmin: {
        companyReportsReducer: { companyReports, error, isFetching }
    }
}) => ({
    companyReports: Object.values(companyReports),
    error,
    isFetching
});

export default connect(mapStateToProps)(CompanyReportsTableContainer);
