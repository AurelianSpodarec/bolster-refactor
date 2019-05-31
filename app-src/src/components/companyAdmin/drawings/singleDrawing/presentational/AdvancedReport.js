import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';

import Block1FiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/Block1FiltersContainer';
import BasicFiltersContainer from 'components/companyAdmin/reports/createReport/components/containers/BasicFiltersContainer';
import FurtherFiltrationContainer from 'components/companyAdmin/reports/createReport/components/containers/FurtherFiltrationContainer';
import OutputSettingsContainer from 'components/companyAdmin/reports/createReport/components/containers/OutputSettingsContainer';
import FilterMapContainer from 'components/companyAdmin/reports/createReport/components/containers/FilterMapContainer';

const AdvancedReport = () => (
    <div className="size-lg-12">
        <div className="size-lg-12">
            <Block>
                <FilterMapContainer />
            </Block>
        </div>

        <div className="flex-container size-lg-12">
            <Block1FiltersContainer blockName="hierarchyFilters" advanced />
            <BasicFiltersContainer blockName="basicFilters" />
        </div>

        <FurtherFiltrationContainer />
        <OutputSettingsContainer />
    </div>
);

export default AdvancedReport;
