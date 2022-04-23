import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';

import EditPinFormContainer from './EditPinFormContainer';
import { componentDidMount } from 'helpers/generic';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import { useAddPinOptions } from '../../../../shared/pins/addPin/fieldTypes/helpers';

const EditPinHistoryContainer = ({ match: { params } }) => {
    const dispatch = useDispatch();
    const { id: pinID, historyID } = params;
    const { drawings, pins, serviceID } = useSelector(mapStateToProps);
    const drawing = drawings[pins[pinID]?.drawingID];

    componentDidMount(() => {
        dispatch(fetchPinOptions());
        dispatch(fetchPinOptionVersions());
        dispatch(fetchSinglePin(pinID, true));
    });

    useEffect(() => {
        if (!drawing && pins[pinID]) {
            dispatch(fetchSingleDrawing(pins[pinID].drawingID));
        }
    }, [drawing, pins]);

    const options = useAddPinOptions(serviceID);

    return (
        <EditPinFormContainer
            drawing={drawing}
            hierarchyType="pin"
            pinID={pinID}
            historyID={historyID}
            pinOptions={options}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { serviceID },
        drawingsReducer: { drawings },
        pinsReducer: { pins },
    },
}) => ({
    pins,
    drawings,
    serviceID,
});

export default withRouter(EditPinHistoryContainer);
