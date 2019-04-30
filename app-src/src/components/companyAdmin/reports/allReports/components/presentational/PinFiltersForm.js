import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import FilterMapContainer from '../containers/FilterMapContainer';
import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BasicFiltersContainer from '../containers/BasicFiltersContainer';
import OutputSettingsContainer from '../containers/OutputSettingsContainer';

const PinFiltersForm = ({
    furtherFiltrationOptions,
    selectedfurtherFiltration,
    handleFurtherFiltrationChange,
    filterOption
}) => (
    <>
        <FilterMapContainer />
        <div className="flex-container size-lg-12">
            <Block1FiltersContainer blockName="hierarchyFilters" />
            <BasicFiltersContainer blockName="basicFilters" />
        </div>

        <div className="size-lg-12">
            <div className="size-lg-12">
                <BlockContainer heading="Further Filtration">
                    <div className="generic-form">
                        <FurtherFiltrationContainer
                            filterOption={filterOption}
                            furtherFiltrationOptions={furtherFiltrationOptions}
                            selectedfurtherFiltration={
                                selectedfurtherFiltration
                            }
                            handleChange={handleFurtherFiltrationChange}
                        />
                    </div>
                </BlockContainer>
            </div>
        </div>
        <OutputSettingsContainer />
    </>
);

export default PinFiltersForm;
