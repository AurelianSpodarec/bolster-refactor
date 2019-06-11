import React from 'react';
import CompanyReportsListItem from './CompanyReportsListItem';

const CompanyReportsList = ({ companyReports }) =>
    companyReports.map(queueItem => (
        <CompanyReportsListItem key={queueItem.id} queueItem={queueItem} />
    ));

export default CompanyReportsList;
