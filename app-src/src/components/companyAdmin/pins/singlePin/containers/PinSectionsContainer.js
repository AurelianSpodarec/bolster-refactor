import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PinSection from '../presentational/PinSection';
import fetchDrawingDropdownOptions from 'actions/companyAdmin/drawings/async/fetchDrawingDropdownOptions';

const PinSectionsContainer = ({ pinHistory, drawingID }) => {
    const dispatch = useDispatch();
    const sections = useSelector(({ companyAdmin: { templateSectionsReducer: { sections } } }) =>
        Object.values(sections),
    );

    const relevantSections = sections
        .filter(({ templateVersionID }) => templateVersionID === pinHistory.templateVersionID)
        .sort((a, b) => a.sort - b.sort);
    useEffect(() => {
        if (drawingID) {
            dispatch(fetchDrawingDropdownOptions(drawingID));
        }
    }, [drawingID]);
    return <PinSection sections={relevantSections} pinHistory={pinHistory} />;
};

export default PinSectionsContainer;
