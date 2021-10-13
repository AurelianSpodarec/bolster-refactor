import React from 'react';

import useMultiReportDrawings from '../../hooks/useMultiReportDrawings';

import FilterMapContainer from 'components/companyAdmin/reports/createReport/components/containers/FilterMapContainer';
import Block1FiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/Block1FiltersContainer';
import BasicFiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/BasicFiltersContainer';
import FurtherFiltrationContainer from 'components/companyAdmin/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/companyAdmin/reports/createReport/components/containers/OutputSettingsContainer';
import DrawingPickerContainer from 'components/companyAdmin/reports/createReport/components/containers/DrawingPickerContainer';
import FilterMapTabs from './FilterMapTabs';

const HierarchyAdvancedReport = ({ isDrawingPage = false }) => {
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
                {!isDrawingPage && (
                    <Block1FiltersContainer
                        blockName="hierarchyFilters"
                        advanced
                        isDrawingPage={isDrawingPage}
                    />
                )}
                <BasicFiltersContainer blockName="basicFilters" isDrawingPage={isDrawingPage} />
            </div>

            <FurtherFiltrationContainer />
            <DrawingPickerContainer />

            <OutputSettingsContainer />
        </>
    );
};

export default HierarchyAdvancedReport;
