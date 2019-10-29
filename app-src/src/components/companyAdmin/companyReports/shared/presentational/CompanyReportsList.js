import React from 'react';
import CompanyReportsListItem from './CompanyReportsListItem';

const CompanyReportsList = ({
    companyReports,
    headers,
    onMobile,
    retryCompanyReport,
    shouldDeleteReportsAfterDownload,
    handleDeleteAfterDownload
}) =>
    companyReports.map(queueItem => (
        <CompanyReportsListItem
            key={queueItem.id}
            queueItem={queueItem}
            headers={headers}
            onMobile={onMobile}
            retryCompanyReport={retryCompanyReport}
            shouldDeleteReportsAfterDownload={shouldDeleteReportsAfterDownload}
            handleDeleteAfterDownload={handleDeleteAfterDownload}
        />
    ));

export default CompanyReportsList;
