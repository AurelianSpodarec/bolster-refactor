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
    const [currentDrawing, setCurrentDrawing] = useState({});
    const [extendDrawingForm, handleFormChange] = useForm({
        newExpiryDate: '',
        extensionReason: '',
    });
    const [daysToExtendBy, handleChange] = useForm({ amountOfDays: '' });
    componentDidMount(fetchAllCompanies);
    componentDidUpdate(handleUpdateCompany, [companyID]);

    const prevProps = usePrevious({ postError, postSuccess, isPosting });

    useEffect(() => {
        if (drawingID) {
            setCurrentDrawing(drawings[drawingID]);
        }

        if (daysToExtendBy.amountOfDays) {
            calculateNewExpiryDate();
        }
        if (postSuccess && !prevProps.postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: `The drawing ${currentDrawing.name} expiration date has been extended by ${daysToExtendBy.amountOfDays} days`,
            });
            setDrawingID(0);
        }
        if (postError && !prevProps.postError) {
            showModal(ERROR_MODAL, {
                title: postError.title || 'Error',
                message: postError.message,
            });
        }
    }, [
        drawingID,
        daysToExtendBy,
        postSuccess,
        isPosting,
        prevProps.postError,
        prevProps.postSuccess,
        prevProps.isPosting,
    ]);

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
            daysToExtendBy={daysToExtendBy}
            handleChange={handleChange}
            handleSubmit={handleSubmitModal}
            handleCancel={handleCancel}
        />
    );

    function _getCompaniesOptionsList() {
        const companiesArr = Object.values(companies).map(({ id, name }) => ({
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

    function calculateNewExpiryDate() {
        const currentExpiryDate = moment(currentDrawing.expiresOn);
        const today = moment();
        let newDate = moment(currentDrawing.expiresOn)
            .add(daysToExtendBy.amountOfDays, 'days')
            .format('YYYY-MM-DDTHH:mm:ss');

        if (currentExpiryDate.diff(today, 'days') >= 1) {
            handleFormChange('newExpiryDate', newDate);
        } else {
            newDate = moment()
                .add(daysToExtendBy.amountOfDays, 'days')
                .format('YYYY-MM-DDTHH:mm:ss');
            handleFormChange('newExpiryDate', newDate);
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
        expiryToolReducer: { isPosting, postSuccess, postError },
    },
}) => ({
    companies,
    drawings,
    fetchingCompanies,
    fetchingDrawings,
    companiesError,
    drawingsError,
    postError,
    isPosting,
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
