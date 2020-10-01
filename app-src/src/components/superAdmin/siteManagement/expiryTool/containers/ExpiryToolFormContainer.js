import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchDrawingsForCompany from 'actions/superAdmin/moveTool/async/fetchDrawingsForCompany';
import { componentDidMount, componentDidUpdate, sortArrayByKeyAndOrder } from 'helpers/generic';
import ExpiryToolForm from '../presentational/ExpiryToolForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { ERROR_MODAL, SUCCESS_MODAL, CONFIRM_SUBMIT } from 'constants/shared/modalTypes';
import { useForm } from 'helpers/hooks';
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
    error,
    showModal,
    hideModal,
    adminEditNewDrawingExpirationDate,
}) => {
    const [companyID, setCompanyID] = useState(0);
    const [drawingID, setDrawingID] = useState(0);
    const [currentDrawing, setCurrentDrawing] = useState({});
    const [extendDrawingForm, handleFormChange] = useForm({
        newExpirationDate: '',
        extensionReason: '',
    });
    const [daysToExtendBy, handleChange] = useForm({ amountOfDays: '' });
    componentDidMount(fetchAllCompanies);
    componentDidUpdate(handleUpdateCompany, [companyID]);

    useEffect(() => {
        if (drawingID) {
            setCurrentDrawing(drawings[drawingID]);
        }

        if (daysToExtendBy.amountOfDays) {
            calculateNewExpiryDate();
        }
    }, [drawingID, daysToExtendBy]);

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
            isPosting={isPosting}
            drawingID={drawingID}
            setDrawingID={setDrawingID}
            currentDrawing={currentDrawing}
            extendDrawingForm={extendDrawingForm}
            handleFormChange={handleFormChange}
            daysToExtendBy={daysToExtendBy}
            handleChange={handleChange}
            handleSubmit={handleSubmitModal}
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
        const newDate = moment(currentDrawing.expiresOn)
            .add(daysToExtendBy.amountOfDays, 'days')
            .format('YYYY-MM-DD HH:mm:ss');

        handleFormChange('newExpirationDate', newDate);
    }

    function handleSubmitModal() {
        const handleSubmit = () => {
            adminEditNewDrawingExpirationDate(extendDrawingForm, drawingID);
            hideModal();
        };
        const message = 'Are you sure you wish to extend this drawings expiration date?';
        showModal(CONFIRM_SUBMIT, { handleSubmit, message, hideModal });
    }
};

const mapStateToProps = ({
    superAdmin: {
        companiesReducer: { companies, isFetching: fetchingCompanies, error: companiesError },
        drawingsReducer: { drawings, isFetching: fetchingDrawings, error: drawingsError },
    },
}) => ({
    companies,
    drawings,
    fetchingCompanies,
    fetchingDrawings,
    companiesError,
    drawingsError,
});

const mapDispatchToProps = {
    fetchAllCompanies,
    fetchDrawingsForCompany,
    showModal,
    hideModal,
    adminEditNewDrawingExpirationDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpiryToolFormContainer);
