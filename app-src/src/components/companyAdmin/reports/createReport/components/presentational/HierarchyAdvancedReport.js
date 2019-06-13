import React from 'react';
import FilterMapContainer from 'components/companyAdmin/reports/createReport/components/containers/FilterMapContainer';
import Block1FiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/Block1FiltersContainer';
import BasicFiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/BasicFiltersContainer';
import FurtherFiltrationContainer from 'components/companyAdmin/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/companyAdmin/reports/createReport/components/containers/OutputSettingsContainer';

const HierarchyAdvancedReport = ({ isDrawingPage = false }) => (
    <>
        <FilterMapContainer />
        <div className="flex-container size-lg-12">
            {!isDrawingPage && (
                <Block1FiltersContainer
                    blockName="hierarchyFilters"
                    advanced
                    isDrawingPage={isDrawingPage}
                />
            )}
            <BasicFiltersContainer
                blockName="basicFilters"
                isDrawingPage={isDrawingPage}
            />
        </div>

        <FurtherFiltrationContainer />
        <OutputSettingsContainer />
    </>
);

export default HierarchyAdvancedReport;
