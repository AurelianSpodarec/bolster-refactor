import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import AddPinHistoryFormContainer from './AddPinHistoryFormContainer';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';
import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinOptionVersions from 'actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from 'actions/companyAdmin/pinOptions/async/fetchPinOptions';
import { componentDidMount } from 'helpers/generic';
import { useAddPinOptions } from 'components_DEPRECATED/shared/pins/addPin/fieldTypes/helpers';
import fetchPinOptionTypes from '../../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import fetchPinOptionSets from '../../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';

const AddPinHistoryContainer = () => {
    const dispatch = useDispatch();
    const { drawings, pins, serviceID } = useSelector(mapStateToProps);
    const params = useParams();
    const pinID = params.id;
    componentDidMount(() => {
        dispatch(fetchPinOptionTypes());
        dispatch(fetchPinOptionSets());
        dispatch(fetchPinOptions());
        dispatch(fetchPinOptionVersions());
        dispatch(fetchSinglePin(pinID, true));
    });
    const pin = pins[pinID];
    const drawing = drawings[pin?.drawingID];

    useEffect(() => {
        if (!drawing && pin) {
            dispatch(fetchSingleDrawing(pin.drawingID));
        }
    }, [drawing, pins]);

    const curServiceID = serviceID ?? pin?.latestServiceID;
    const options = useAddPinOptions(curServiceID);

    return (
        <AddPinHistoryFormContainer
            drawing={drawing}
            hierarchyType="pin"
            pinID={pinID}
            isHistory
            pinOptions={options}
            drawingID={drawing?.id}
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

export default AddPinHistoryContainer;
