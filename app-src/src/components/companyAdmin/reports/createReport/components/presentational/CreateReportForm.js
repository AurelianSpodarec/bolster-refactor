import React from 'react';

import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import FilterMapContainer from '../containers/FilterMapContainer';
import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BasicFiltersContainer from '../containers/BasicFiltersContainer';
import OutputSettingsContainer from '../containers/OutputSettingsContainer';

const CreateReportForm = () => (
    <>
        <FilterMapContainer />
        <div className="flex-container size-lg-12">
            <Block1FiltersContainer blockName="hierarchyFilters" />
            <BasicFiltersContainer blockName="basicFilters" />
        </div>

        {/* <FurtherFiltrationContainer /> */}
        <OutputSettingsContainer />
    </>
);

export default CreateReportForm;
