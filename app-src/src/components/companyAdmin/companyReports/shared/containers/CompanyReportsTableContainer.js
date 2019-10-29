import React from 'react';
import { connect } from 'react-redux';
import CompanyReportsTable from '../presentational/CompanyReportsTable';
import { sortArrayByKeyAndOrder } from 'helpers/generic';
import retryReport from 'actions/companyAdmin/reports/async/retryReport';
import fetchCompanyReports from 'actions/companyAdmin/companyReports/async/fetchCompanyReports';
import fetchCompanyReportsFull from 'actions/companyAdmin/companyReports/async/fetchCompanyReportsFull';
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
    fetchCompanyReports,
    fetchCompanyReportsFull,
    fetchStatus,
    shouldDeleteReportsAfterDownload,
    deleteReport,
    showModal,
    hideModal
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
            shouldDeleteReportsAfterDownload={shouldDeleteReportsAfterDownload}
            handleDeleteAfterDownload={handleDeleteAfterDownload}
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
        retryReport(id).then(fetchCompanyReports);
    }

    function handleDeleteAfterDownload(queueItem) {

        const message = 'Downloading this report will delete the file from our servers, continue?';
        const submitButtonText = 'Download and Delete'; 
        const s3URL = `${RAW_S3_STORAGE_URL}/${queueItem.s3Key}`;
        const handleSubmit = () => {
            deleteReport(queueItem.id);
            window.open(s3URL);
            hideModal();
        };
        showModal(CONFIRM_SUBMIT, {
            message,
            submitButtonText,
            handleSubmit
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
            fetchStatus
        },
        companySettingsReducer: {
            companySettings: {
                shouldDeleteReportsAfterDownload
            }
        }
    },
    shared: {
        mobileReducer: { onMobile },

    }
}) => ({
    companyReports: Object.values(companyReports),
    error,
    isFetching,
    sortString,
    onMobile,
    fetchStatus,
    shouldDeleteReportsAfterDownload
});

const mapDispatchToProps = { 
    retryReport,
    fetchCompanyReports, 
    fetchCompanyReportsFull, 
    deleteReport,
    showModal,
    hideModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyReportsTableContainer);
