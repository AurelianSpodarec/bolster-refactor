import React, { useState, useEffect, useMemo } from 'react';
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
    isPosting,
    postSuccess,
    postError,
    showModal,
    hideModal,
    adminEditNewDrawingExpirationDate,
    history,
}) => {
    const [companyID, setCompanyID] = useState(0);
    const [drawingID, setDrawingID] = useState(0);
    const currentDrawing = drawings[drawingID] || {};
    const [showExpiredMessage, setShowExpiredMessage] = useState(false);
    const [extendDrawingForm, handleFormChange] = useForm({
        newExpiryDate: '',
        extensionReason: '',
    });
    componentDidMount(fetchAllCompanies);
    componentDidUpdate(handleUpdateCompany, [companyID]);

    const prevProps = usePrevious({ postError, postSuccess });

    useEffect(() => {
        if (drawingID) {
            isExpired();
        }

        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `The drawing ${
                    currentDrawing.name
                } expiration date has been set to ${moment(extendDrawingForm.newExpiryDate).format(
                    'DD/MM/yyyy',
                )}`,
            });
            setDrawingID(0);
            handleFormChange('extensionReason', '');
            handleFormChange('newExpiryDate', '');
        }

        if (postError && !prevProps.postError) {
            showModal(ERROR_MODAL, {
                title: postError.title || 'Error',
                message: postError.message,
            });
        }
    }, [drawingID, postSuccess, currentDrawing, prevProps.postError, prevProps.postSuccess]);

    return (
        <ExpiryToolForm
            companiesOptions={_getCompaniesOptionsList()}
            companiesError={companiesError}
            drawings={drawings}
            drawingsOptions={_getDrawingsOptionsList()}
            drawingsError={drawingsError}
            fetchingCompanies={fetchingCompanies}
            fetchingDrawings={fetchingDrawings}
            companyID={companyID}
            setCompanyID={setCompanyID}
            drawingID={drawingID}
            setDrawingID={setDrawingID}
            currentDrawing={currentDrawing}
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
                    disabled: drawingID === id,
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
        const currentExpiryDate = moment(currentDrawing.expiresOn);
        const today = moment();

        if (currentExpiryDate.diff(today, 'days') < 0) {
            setShowExpiredMessage(true);
        } else {
            setShowExpiredMessage(false);
        }
    }

    function handleSubmitModal() {
        const handleSubmit = () => {
            adminEditNewDrawingExpirationDate(extendDrawingForm, drawingID);
            hideModal();
        };
        const message = 'Are you sure you wish to extend this drawings expiration date?';
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
