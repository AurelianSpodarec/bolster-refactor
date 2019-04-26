import React from 'react';
import CompanyReportsListItemContainer from '../containers/CompanyReportsListItemContainer';

const CompanyReportsList = ({ companyReports }) =>
    companyReports.map(queueItem => (
        <CompanyReportsListItemContainer
            key={queueItem.id}
            queueItem={queueItem}
        />
    ));

export default CompanyReportsList;
