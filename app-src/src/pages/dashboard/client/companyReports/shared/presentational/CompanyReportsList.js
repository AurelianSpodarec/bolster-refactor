import React from 'react';
import CompanyReportsListItem from './CompanyReportsListItem';

const CompanyReportsList = ({ companyReports, headers, onMobile }) =>
    companyReports.map(queueItem => (
        <CompanyReportsListItem
            key={queueItem.id}
            queueItem={queueItem}
            headers={headers}
            onMobile={onMobile}
        />
    ));

export default CompanyReportsList;
