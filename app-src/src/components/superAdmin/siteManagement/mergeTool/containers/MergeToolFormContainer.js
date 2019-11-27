import React, { useState } from 'react';
import { connect } from 'react-redux';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchDrawingsForCompany from 'actions/superAdmin/moveTool/async/fetchDrawingsForCompany';
import { componentDidMount, componentDidUpdate, sortArrayByKeyAndOrder } from 'helpers/generic';
import MergeToolForm from '../presentational/MergeToolForm';
import mergeDrawings from 'actions/superAdmin/mergeTool/async/mergeDrawings';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
const defaultPoints = {A: null, B: null};

const MergeToolFormContainer = ({ 
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
    mergeDrawings,
    showModal
}) => {
    const [companyID, setCompanyID] = useState(0);
    const [sourceDrawingID, setSourceDrawingID] = useState(0);
    const [destDrawingID, setDestDrawingID] = useState(0);
    const [sourceDrawingPoints, setSourceDrawingPoints] = useState(defaultPoints);
    const [destDrawingPoints, setDestDrawingPoints] = useState(defaultPoints);

    const areDrawingIDsSet = sourceDrawingID && destDrawingID;
    const areSourcePointsSet = (!!sourceDrawingPoints.A && !!sourceDrawingPoints.B);
    const areDestPointsSet = (!!destDrawingPoints.A && !!destDrawingPoints.B);
    const areBothPointsSet = areSourcePointsSet && areDestPointsSet;

    const shouldShowSubmit = areBothPointsSet && areDrawingIDsSet && !isPosting;

    componentDidMount(fetchAllCompanies);

    componentDidUpdate(handleUpdateCompany, [companyID]);
    componentDidUpdate(handleError, [error]);
    componentDidUpdate(handleSuccess, [postSuccess]);

    return (
        <MergeToolForm 
            companiesOptions={_getCompaniesOptionsList()}
            companiesError={companiesError}
            drawings={drawings}
            drawingsOptions={_getDrawingsOptionsList()}
            drawingsError={drawingsError}
            fetchingCompanies={fetchingCompanies}
            fetchingDrawings={fetchingDrawings}
            companyID={companyID}
            setCompanyID={setCompanyID}
            sourceDrawingID={sourceDrawingID}
            setSourceDrawingID={setSourceDrawingID}
            sourceDrawingPoints={sourceDrawingPoints}
            setSourceDrawingPoints={setSourceDrawingPoints}
            destDrawingID={destDrawingID}
            setDestDrawingID={setDestDrawingID}
            destDrawingPoints={destDrawingPoints}
            setDestDrawingPoints={setDestDrawingPoints}
            shouldShowSubmit={shouldShowSubmit}
            handleSubmit={handleSubmit}
            isPosting={isPosting}
        />
    );

    function _getCompaniesOptionsList() {
        const companiesArr = Object.values(companies).map(({ id, name }) => ({
            value: id,
            label: name,
            text: name
        }));
        const sortedCompanies = sortArrayByKeyAndOrder(companiesArr, 'text', true, 'id');
        return sortedCompanies;
    }

    function _getDrawingsOptionsList() {
        const drawingsArr = Object.values(drawings)
            .map(({id, siteName, buildingName, floorName, name}) => {
                const text = `${siteName} / ${buildingName} / ${floorName} ${name}`;
                return {
                    value: id, 
                    label: text,
                    text,
                    disabled: sourceDrawingID === id || destDrawingID === id
                };
            });
        const sortedDrawings = sortArrayByKeyAndOrder(drawingsArr, 'text', true, 'id');
        return sortedDrawings;
    }

    function handleUpdateCompany() {
        fetchDrawingsForCompany(companyID);
        resetState();
    }

    function handleError() {
        if (error) {
            const title = 'Merge Error.';
            const message = 'Something went wrong trying to merge. Please try again.';
            showModal(ERROR_MODAL, { title, message });
        }
    }
    
    function handleSuccess() {
        if (postSuccess) {
            const title ='Merge Successful!';
            const message = 'Drawings Successfully merged.';
            showModal(SUCCESS_MODAL, { title, message });
        } else {
            resetState();
        }
    }
    
    function handleSubmit() {
        if (sourceDrawingID === destDrawingID) {
            const title = 'Validation Error.';
            const message = 'You cannot merge a drawing into itself';
            return showModal(ERROR_MODAL, {title, message});
        }
        const postBody = {
            source: {
                drawingID: sourceDrawingID,
                locationA: sourceDrawingPoints.A,
                locationB: sourceDrawingPoints.B
            },
            destination: {
                drawingID: destDrawingID,
                locationA: destDrawingPoints.A,
                locationB: destDrawingPoints.B
            }
        };
        mergeDrawings(postBody);
    }

    function resetState() {
        setSourceDrawingID(0);
        setSourceDrawingPoints(defaultPoints);
        setDestDrawingID(0);
        setDestDrawingPoints(defaultPoints);
    }
};

const mapStateToProps = ({ 
    superAdmin: {
        companiesReducer: { companies, isFetching: fetchingCompanies, error: companiesError },
        drawingsReducer: { drawings, isFetching: fetchingDrawings, error: drawingsError },
        mergeToolReducer: { isPosting, error, postSuccess}
    }
}) => ({
    companies,
    drawings,
    fetchingCompanies,
    fetchingDrawings,
    companiesError,
    drawingsError,
    isPosting,
    error, 
    postSuccess
});

const mapDispatchToProps = { fetchAllCompanies, fetchDrawingsForCompany, mergeDrawings, showModal };

export default connect(mapStateToProps, mapDispatchToProps)(MergeToolFormContainer);