import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddPinHistoryFormContainer from './AddPinHistoryFormContainer';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinOptionVersions from 'actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from 'actions/companyAdmin/pinOptions/async/fetchPinOptions';
import { componentDidMount } from 'helpers/generic';
import { useAddPinOptions } from '../../../../shared/pins/addPin/fieldTypes/helpers';

const AddPinHistoryContainer = ({ match: { params } }) => {
    const dispatch = useDispatch();
    const { drawings, pins, serviceID } = useSelector(mapStateToProps);
    const pinID = params.id;
    componentDidMount(() => {
        dispatch(fetchPinOptions());
        dispatch(fetchPinOptionVersions());
        dispatch(fetchSinglePin(pinID, true));
    });
    const drawing = drawings[pins[pinID]?.drawingID];
    useEffect(() => {
        if (!drawing && pins[pinID]) {
            dispatch(fetchSingleDrawing(pins[pinID].drawingID));
        }
    }, [drawing, pins]);

    const options = useAddPinOptions(serviceID);

    return (
        <AddPinHistoryFormContainer
            drawing={drawing}
            hierarchyType="pin"
            pinID={pinID}
            isHistory
            pinOptions={options}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        drawingsReducer: { drawings },
        pinsReducer: { pins },
        addPinFormReducer: { serviceID },
    },
}) => {
    return {
        pins,
        drawings,
        serviceID,
    };
};

export default withRouter(AddPinHistoryContainer);
