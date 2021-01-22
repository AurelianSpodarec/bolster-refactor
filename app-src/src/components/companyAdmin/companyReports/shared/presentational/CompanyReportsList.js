import React from 'react';
import CompanyReportsListItem from './CompanyReportsListItem';

const CompanyReportsList = ({
    companyReports,
    headers,
    onMobile,
    retryCompanyReport,
    shouldDeleteReportsAfterDownload,
    handleDeleteAfterDownload,
    isFetching,
    singleReportFetching,
    fetchingReportsIDs,
    handleGeneratingReport,
}) =>
    companyReports.map(queueItem => (
        <CompanyReportsListItem
            singleReportFetching={singleReportFetching}
            key={queueItem.id}
            queueItem={queueItem}
            headers={headers}
            onMobile={onMobile}
            isFetching={isFetching}
            retryCompanyReport={retryCompanyReport}
            shouldDeleteReportsAfterDownload={shouldDeleteReportsAfterDownload}
            handleDeleteAfterDownload={handleDeleteAfterDownload}
            fetchingReportsIDs={fetchingReportsIDs}
            handleGeneratingReport={handleGeneratingReport}
        />
    ));

export default CompanyReportsList;
