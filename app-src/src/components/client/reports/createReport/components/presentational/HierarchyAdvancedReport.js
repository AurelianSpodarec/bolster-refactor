import React from 'react';
import FilterMapContainer from '../containers/FilterMapContainer';
import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BasicFiltersContainer from '../containers/BasicFiltersContainer';
import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import OutputSettingsContainer from '../containers/OutputSettingsContainer';

const HierarchyAdvancedReport = () => (
    <>
        <FilterMapContainer />
        <div className="flex-container size-lg-12">
            <Block1FiltersContainer blockName="hierarchyFilters" advanced />
            <BasicFiltersContainer blockName="basicFilters" />
        </div>

        <FurtherFiltrationContainer />
        <OutputSettingsContainer />
    </>
);

export default HierarchyAdvancedReport;
