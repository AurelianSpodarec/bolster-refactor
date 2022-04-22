import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

import AddPinFormContainer from './AddPinFormContainer';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';
import { componentDidMount } from '../../../../../helpers/generic';
import { useAddPinOptions } from '../../../../shared/pins/addPin/fieldTypes/helpers';

const AddPinContainer = ({ match: { params } }) => {
    const { serviceID } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const { drawingID } = params;
    componentDidMount(() => {
        batch(() => {
            dispatch(fetchPins('drawing', drawingID));
            dispatch(fetchPinOptions());
            dispatch(fetchPinOptionVersions());
            dispatch(fetchSingleDrawing(drawingID));
            dispatch(fetchDrawingTemplates(drawingID));
        });
    });

    const options = useAddPinOptions(serviceID);

    return (
        <AddPinFormContainer hierarchyType="drawing" drawingID={drawingID} pinOptions={options} />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { serviceID },
    },
}) => ({
    serviceID,
});

export default withRouter(AddPinContainer);
