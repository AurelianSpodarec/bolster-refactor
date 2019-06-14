import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';

const CompanyReportsTableContainer = ({
    isFetching,
    error,
    companyReports,
    sortString = ''
}) => {
    return (
        <CompanyReportsTable
            headers={[
                'Name',
                'Type',
                'Status',
                'Created On',
                'Completed on',
                ''
            ]}
            isFetching={isFetching}
            error={error}
            companyReports={_getSortedQueue()}
        />
    );

    function _getSortedQueue() {
        const [fieldName, sortOrder] = sortString.split(' ');
        return sortArrayByKeyAndOrder(companyReports, fieldName, sortOrder);
    }
};

const mapStateToProps = ({
    companyAdmin: {
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
