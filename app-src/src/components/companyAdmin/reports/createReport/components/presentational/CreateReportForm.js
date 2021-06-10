import React from 'react';

import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import FilterMapContainer from '../containers/FilterMapContainer';
import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BasicFiltersContainer from '../containers/BasicFiltersContainer';
import OutputSettingsContainer from '../containers/OutputSettingsContainer';
import DrawingPickerContainer from '../containers/DrawingPickerContainer';
import { useSelector } from 'react-redux';

const CreateReportForm = () => {
    const { drawingIDs } = useSelector(mapStateToProps);

    return (
        <>
            {drawingIDs.map(drawingID => (
                <FilterMapContainer key={drawingID} mapDrawingID={drawingID} />
            ))}
            <div className="flex-container size-lg-12">
                <Block1FiltersContainer blockName="hierarchyFilters" getAllOperatives />
                <BasicFiltersContainer blockName="basicFilters" />
            </div>

            <FurtherFiltrationContainer />
            <DrawingPickerContainer />

            <OutputSettingsContainer />
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        reportsReducer: { filters },
    },
}) => ({
    drawingIDs: filters.drawingID || [],
});

export default CreateReportForm;
