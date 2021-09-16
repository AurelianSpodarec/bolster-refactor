import React from 'react';

import useMultiReportDrawings from '../../hooks/useMultiReportDrawings';

import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import FilterMapContainer from '../containers/FilterMapContainer';
import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BasicFiltersContainer from '../containers/BasicFiltersContainer';
import OutputSettingsContainer from '../containers/OutputSettingsContainer';
import DrawingPickerContainer from '../containers/DrawingPickerContainer';
import FilterMapTabs from './FilterMapTabs';

const CreateReportForm = () => {
    const { drawingIDs, selectedDrawingID, setSelectedDrawingID } = useMultiReportDrawings();

    return (
        <>
            {drawingIDs.length > 1 && (
                <FilterMapTabs
                    drawingIDs={drawingIDs}
                    selectedDrawingID={selectedDrawingID}
                    setSelectedDrawingID={setSelectedDrawingID}
                />
            )}

            {selectedDrawingID && <FilterMapContainer mapDrawingID={selectedDrawingID} />}

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

export default CreateReportForm;
