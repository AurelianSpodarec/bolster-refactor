import React from 'react';

import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';
import retryReport from 'actions/companyAdmin/reports/async/retryReport';
import fetchCompanyReportSingle from 'actions/companyAdmin/companyReports/async/fetchCompanyReportSingle';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import fetchCompanyReportsFull from 'actions/companyAdmin/companyReports/async/fetchCompanyReportsFull';
import changeCompanyReportsFetchFull from 'actions/companyAdmin/companyReports/sync/changeCompanyReportsFetchFull';
import deleteReport from 'actions/companyAdmin/reports/async/deleteReport';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import { RAW_S3_STORAGE_URL } from 'config';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const CompanyReportsTableContainer = ({
    isFetching,
    error,
    companyReports,
    sortString = '',
    onMobile,
    retryReport,
    changeCompanyReportsFetchFull,
    fetchCompanyReportsFull,
    fetchStatus,
    shouldDeleteReportsAfterDownload,
    deleteReport,
    showModal,
    hideModal,
    companyID,
}) => {
    const companyIDsForBothGenerators = [
        112, // Bolster Systems
        856, // Passive Fire NZ
        1817, // PassSafe Fire Protection
        2058, // Optimal Fire
        2154, // Flame Stoppers
    ];
    // my id
    const shouldShowBoth = companyIDsForBothGenerators.includes(companyID);
    return (
        <CompanyReportsTable
            headers={['Name', 'Created By', 'Type', 'Status', 'Created On', 'Completed on', '']}
            isFetching={isFetching}
            error={error}
            companyReports={_getSortedQueue()}
            onMobile={onMobile}
            retryCompanyReport={retryCompanyReport}
            handleFetchCompanyReportsFull={handleFetchCompanyReportsFull}
            fetchStatus={fetchStatus}
            shouldDeleteReportsAfterDownload={shouldDeleteReportsAfterDownload}
            handleDeleteAfterDownload={handleDeleteAfterDownload}
            shouldShowBothReportButtons={shouldShowBoth}
        />
    );

    function _getSortedQueue() {
        //no idea why this const doesnt work????
        // const [fieldName, sortOrder] = sortString.split(' ');

        const fieldAndSort = sortString.split(' ');

        const fieldName = fieldAndSort[0];
        const sortOrder = fieldAndSort[1];

        if (sortOrder === 'asc') {
            return sortArrayByKeyAndOrder(companyReports, fieldName, true);
        } else {
            return sortArrayByKeyAndOrder(companyReports, fieldName, false);
        }
    }

    function retryCompanyReport(id) {
        retryReport(id);
    }

    function handleFetchCompanyReportsFull() {
        fetchCompanyReportsFull().then(() => {
            return changeCompanyReportsFetchFull();
        });
    }

    function handleDeleteAfterDownload(queueItem) {
        const message =
            'As per your company settings, downloading this report will delete it from our server.';
        const submitButtonText = 'Download and Delete';
        const s3URL = `${RAW_S3_STORAGE_URL}/${queueItem.s3Key}`;
        const handleSubmit = () => {
            // wait 1s before deleting to ensure download has begun
            setTimeout(() => {
                deleteReport(queueItem.id);
            }, 3000);
            window.open(s3URL);
            hideModal();
        };
        showModal(CONFIRM_SUBMIT, {
            message,
            submitButtonText,
            handleSubmit,
        });
    }
};

const mapStateToProps = ({
    companyAdmin: {
        companyReportsReducer: {
            companyReports,
            error,
            isFetching,
            sort: { sortString },
            fetchStatus,
        },
        companySettingsReducer: {
            companySettings: { shouldDeleteReportsAfterDownload },
        },
    },
    shared: {
        mobileReducer: { onMobile },
        decodeJWTReducer: {
            jwtData: { companyID },
        },
    },
}) => ({
    companyReports: Object.values(companyReports),
    error,
    isFetching,
    sortString,
    onMobile,
    fetchStatus,
    shouldDeleteReportsAfterDownload,
    companyID,
});

const mapDispatchToProps = {
    retryReport,
    fetchCompanyReports,
    fetchCompanyReportsFull,
    fetchCompanyReportSingle,
    changeCompanyReportsFetchFull,
    deleteReport,
    showModal,
    hideModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyReportsTableContainer);
