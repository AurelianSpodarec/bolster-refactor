import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import fetchAllCompanies from 'actions/superAdmin/companies/async/fetchAllCompanies';
import fetchDrawingsForCompany from 'actions/superAdmin/moveTool/async/fetchDrawingsForCompany';
import { componentDidMount, componentDidUpdate, sortArrayByKeyAndOrder } from 'helpers/generic';
import ExpiryToolForm from '../presentational/ExpiryToolForm';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
const defaultPoints = { A: null, B: null };

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
}) => {
    const [companyID, setCompanyID] = useState(0);
    const [drawingID, setDrawingID] = useState(0);
    const [currentDrawing, setCurrentDrawing] = useState({});

    componentDidMount(fetchAllCompanies);
    componentDidUpdate(handleUpdateCompany, [companyID]);

    useEffect(() => {
        if (drawingID) {
            setCurrentDrawing(drawings[drawingID]);
        }
    }, [drawingID]);

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

const mapDispatchToProps = { fetchAllCompanies, fetchDrawingsForCompany, showModal };

export default connect(mapStateToProps, mapDispatchToProps)(ExpiryToolFormContainer);
