import React from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import fetchDrawingTemplates from 'actions/companyAdmin/drawings/async/fetchDrawingTemplates';
import fetchPins from 'actions/companyAdmin/pins/async/fetchPins';
import fetchSingleDrawing from 'actions/companyAdmin/drawings/async/fetchSingleDrawing';

import AddPinFormContainer from './AddPinFormContainer';
import fetchPinOptionVersions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionVersions';
import fetchPinOptions from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptions';
import { componentDidMount } from '../../../../../helpers/generic';
import { useAddPinOptions } from '../../../../shared/pins/addPin/fieldTypes/helpers';
import fetchPinOptionTypes from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionTypes';
import { selectDrawing } from '../../../../../selectors/companyAdmin/drawings';
import fetchPinOptionSets from '../../../../../actions/companyAdmin/pinOptions/async/fetchPinOptionSets';

const AddPinContainer = () => {
    const { serviceID } = useSelector(mapStateToProps);
    const dispatch = useDispatch();
    const params = useParams();
    const { id: drawingID } = params;
    componentDidMount(() => {
        batch(() => {
            dispatch(fetchPins('drawing', drawingID));
            dispatch(fetchPinOptionTypes());
            dispatch(fetchPinOptionSets());
            dispatch(fetchPinOptions());
            dispatch(fetchPinOptionVersions());
            dispatch(fetchSingleDrawing(drawingID));
            dispatch(fetchDrawingTemplates(drawingID));
        });
    });

    const options = useAddPinOptions(serviceID);
    const drawing = useSelector(state => selectDrawing(state, drawingID));

    return (
        <AddPinFormContainer
            hierarchyType="drawing"
            drawingID={drawingID}
            pinOptions={options}
            drawing={drawing}
        />
    );
};

const mapStateToProps = ({
    companyAdmin: {
        addPinFormReducer: { serviceID },
    },
}) => ({
    serviceID,
});

export default React.memo(AddPinContainer);
