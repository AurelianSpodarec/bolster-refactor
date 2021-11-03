import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchDrawingsForCompany from 'actions/superAdmin/moveTool/async/fetchDrawingsForCompany';
import { componentDidMount, componentDidUpdate, sortArrayByKeyAndOrder } from 'helpers/generic';
import ExpiryToolForm from '../presentational/ExpiryToolForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL, SUCCESS_MODAL, CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import { useForm, usePrevious } from 'helpers/hooks';
import adminEditNewDrawingExpirationDate from 'actions/superAdmin/expiryTool/asyc/expiryTool';
import { COMPANY_TYPES } from 'constants/companyAdmin/enums';

const ExpiryToolFormContainer = ({
    companies,
    drawings,
    fetchingCompanies,
    fetchingDrawings,
    companiesError,
    drawingsError,
    fetchAllCompanies,
    fetchDrawingsForCompany,
    postSuccess,
    postError,
    showModal,
    hideModal,
    adminEditNewDrawingExpirationDate,
    history,
}) => {
    const [companyID, setCompanyID] = useState(0);
    const [showExpiredMessage, setShowExpiredMessage] = useState(false);
    const [extendDrawingForm, handleFormChange] = useForm({
        newExpiryDate: '',
        extensionReason: '',
        drawingIDs: [],
    });
    const currentDrawings = Object.values(drawings).filter(({ id }) =>
        extendDrawingForm.drawingIDs.includes(id),
    );
    componentDidMount(fetchAllCompanies);
    componentDidUpdate(handleUpdateCompany, [companyID]);

    const prevProps = usePrevious({
        postError,
        postSuccess,
        drawingIDs: extendDrawingForm.drawingIDs,
        companyID,
    });

    useEffect(() => {
        if (extendDrawingForm.drawingIDs.length) {
            isExpired();
        }
        if (extendDrawingForm.drawingIDs.length && !prevProps.drawingIDs.length) {
            handleFormChange('newExpiryDate', currentDrawings[0].expiresOn);
            handleFormChange('extensionReason', currentDrawings[0].extensionReason);
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `The drawings expiration date has been set to ${moment(
                    extendDrawingForm.newExpiryDate,
                ).format('DD/MM/yyyy')}`,
            });
            handleFormChange('drawingIDs', []);
            handleFormChange('extensionReason', '');
            handleFormChange('newExpiryDate', '');
        }

        if (companyID !== prevProps.companyID) {
            handleFormChange('drawingIDs', []);
        }

        if (postError && !prevProps.postError) {
            showModal(ERROR_MODAL, {
                title: postError.title || 'Error',
                message: postError.message,
            });
        }
    }, [
        extendDrawingForm.drawingIDs,
        postSuccess,
        currentDrawings,
        prevProps.postError,
        prevProps.postSuccess,
    ]);

    return (
        <ExpiryToolForm
            companiesOptions={_getCompaniesOptionsList()}
            companiesError={companiesError}
            drawings={drawings.filter(drawing => drawing.companyID === companyID)}
            drawingsOptions={_getDrawingsOptionsList()}
            drawingsError={drawingsError}
            fetchingCompanies={fetchingCompanies}
            fetchingDrawings={fetchingDrawings}
            companyID={companyID}
            setCompanyID={setCompanyID}
            currentDrawings={currentDrawings}
            extendDrawingForm={extendDrawingForm}
            handleFormChange={handleFormChange}
            handleSubmit={handleSubmitModal}
            handleCancel={handleCancel}
            showExpiredMessage={showExpiredMessage}
        />
    );

    function _getCompaniesOptionsList() {
        const companiesArr = Object.values(companies)
            .filter(
                ({ companyType }) => companyType === COMPANY_TYPES['Company - Active Subscription'],
            )
            .map(({ id, name }) => ({
                value: id,
                label: name,
                text: name,
            }));
        const sortedCompanies = sortArrayByKeyAndOrder(companiesArr, 'text', true, 'id');
        return sortedCompanies;
    }

    function _getDrawingsOptionsList() {
        const drawingsArr = Object.values(drawings).map(
            ({ id, siteName, buildingName, floorName, name }) => {
                const text = `${siteName} / ${buildingName} / ${floorName} ${name}`;
                return {
                    value: id,
                    label: text,
                    text,
                    disabled: extendDrawingForm.drawingIDs.includes(id),
                };
            },
        );
        const sortedDrawings = sortArrayByKeyAndOrder(drawingsArr, 'text', true, 'id');
        return sortedDrawings;
    }

    function handleUpdateCompany() {
        fetchDrawingsForCompany(companyID);
    }

    function isExpired() {
        let shouldShowMessage = false;
        const today = moment();
        currentDrawings.forEach(drawing => {
            const currentExpiryDate = moment(drawing.expiresOn);
            if (currentExpiryDate.diff(today, 'days') < 0) {
                shouldShowMessage = true;
            }
        });
        setShowExpiredMessage(shouldShowMessage);
    }

    function handleSubmitModal() {
        const handleSubmit = () => {
            adminEditNewDrawingExpirationDate(extendDrawingForm);
            hideModal();
        };
        const message = 'Are you sure you wish to extend these drawings expiration date?';
        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    }

    function handleCancel() {
        history.push('/admin');
    }
};

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies, isFetching: fetchingCompanies, companiesError },
        drawingsReducer: { drawings, isFetching: fetchingDrawings, drawingsError },
        expiryToolReducer: { postSuccess, postError },
    },
}) => ({
    companies,
    drawings,
    fetchingCompanies,
    fetchingDrawings,
    companiesError,
    drawingsError,
    postError,
    postSuccess,
});

const mapDispatchToProps = {
    fetchAllCompanies,
    fetchDrawingsForCompany,
    showModal,
    hideModal,
    adminEditNewDrawingExpirationDate,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExpiryToolFormContainer));
