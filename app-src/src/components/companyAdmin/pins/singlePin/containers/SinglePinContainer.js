import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fetchSinglePin from 'actions/companyAdmin/pins/async/fetchSinglePin';
import fetchPinTemplates from 'actions/companyAdmin/pins/async/fetchPinTemplates';
import fetchCompanyUsers from 'actions/companyAdmin/userManagement/async/fetchCompanyUsers';
import SinglePin from '../presentational/SinglePin';
import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import fetchAllPinsForDrawing from 'actions/companyAdmin/pins/async/fetchAllPinsForDrawing';
import fetchAllOptionValues from 'actions/companyAdmin/manufacturers/async/fetchAllOptionValues';
import fetchZonesByDrawingID from 'actions/companyAdmin/zones/async/fetchZonesByDrawingID';
import { componentDidMount } from '../../../../../helpers/generic';
import { selectPin } from '../../../../../selectors/companyAdmin/pins';

const SinglePinContainer = ({ singlePinTasks }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { id: pinID } = useParams();
    const pin = useSelector(state => selectPin(state, pinID));

    componentDidMount(fetchPin);
    useEffect(() => {
        if (pinID) fetchPin();
    }, [pinID]);

    return <SinglePin isLoading={isLoading} pin={pin} pinTasks={formatPinTasks} />;

    function formatPinTasks() {
        return singlePinTasks?.map(task => {
            return {
                ...task,
                taskType: task.taskType.replace('_', ' '),
                taskStatus: task.taskStatus.replace('_', ' '),
            };
        });
    }

    function fetchPin() {
        let drawingID = null;

        dispatch(fetchAllOptionValues());

        dispatch(fetchSinglePin(pinID))
            .then(({ payload }) => {
                drawingID = payload.pin.drawingID;
                if (drawingID) {
                    dispatch(fetchZonesByDrawingID(drawingID));
                    dispatch(fetchAllPinsForDrawing(drawingID, pinID));
                    return Promise.all([
                        dispatch(fetchPinTemplates(pinID)),
                        dispatch(fetchCompanyUsers()),
                        dispatch(fetchDrawingTemplates(drawingID)),
                        dispatch(fetchDrawingDropdownOptions(drawingID)),
                        dispatch(fetchZonesByDrawingID(drawingID)),
                    ]);
                }
            })
            .then(() => {
                setIsLoading(false);
                if (drawingID) {
                    dispatch(fetchAllPinsForDrawing(drawingID, pinID));
                }
            });
    }
};

export default SinglePinContainer;
