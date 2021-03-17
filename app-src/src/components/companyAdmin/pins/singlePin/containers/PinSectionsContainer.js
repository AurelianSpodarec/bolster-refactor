import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PinSection from '../presentational/PinSection';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';
import { componentDidMount } from 'helpers/generic';

const PinSectionsContainer = ({ pinHistory, drawingID }) => {
    const dispatch = useDispatch();
    const sections = useSelector(({ companyAdmin: { templateSectionsReducer: { sections } } }) =>
        Object.values(sections),
    );

    const relevantSections = sections
        .filter(({ templateVersionID }) => templateVersionID === pinHistory.templateVersionID)
        .sort((a, b) => a.sort - b.sort);

    componentDidMount(() => {
        dispatch(fetchDrawingDropdownOptions(drawingID));
    });

    return <PinSection sections={relevantSections} pinHistory={pinHistory} />;
};

export default PinSectionsContainer;
