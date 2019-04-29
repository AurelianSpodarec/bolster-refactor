import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
// import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import StatusTypeFilterContainer from '../containers/StatusTypeFilterContainer';
import ServicesFilterContainer from '../containers/ServicesFilterContainer';
import DatesFilterContainer from '../containers/DatesFilterContainer';
// import ReportOptionsContainer from '../containers/ReportOptionsContainer';
// import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import NumberOfHistoriesContainer from '../containers/NumberOfHistoriesContainer';
// import SortByContainer from '../containers/SortByContainer';
import ReportFormatsContainer from '../containers/ReportFormatsContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
// import CustomFiltersContainer from '../containers/CustomFiltersContainer';
// import OperativesFilterContainer from '../containers/OperativesFilterContainer';
import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';
import OtherOptionsContainer from '../containers/OtherOptionsContainer';
import FilterMapContainer from '../containers/FilterMapContainer';

import Block1FiltersContainer from '../containers/Block1FiltersContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const PinFiltersForm = ({
    furtherFiltrationOptions,
    selectedfurtherFiltration,
    handleFurtherFiltrationChange,
    filterOption,
    handleSubmit
}) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <FilterMapContainer />
        <div className="flex-container size-lg-12">
            <Block1FiltersContainer blockName="block1" />
            <div className="flex-item size-lg-6">
                <BlockContainer>
                    <div className="size-lg-12">
                        <BlockHeading title="Basic Filtration" />
                        <ServicesFilterContainer />
                        <StatusTypeFilterContainer />
                        <DatesFilterContainer />
                    </div>
                </BlockContainer>
            </div>
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
        <div className="size-lg-12">
            <BlockContainer>
                <div className="size-lg-12">
                    <BlockHeading title="Output Settings" />
                    <div className="generic-form">
                        <div className="size-lg-6">
                            <NumberOfHistoriesContainer />
                            <ReportFormatsContainer />
                        </div>
                        <div className="size-lg-6">
                            <OtherOptionsContainer />
                        </div>
                        <BlockButtonWrapper>
                            <button className="button green" type="submit">
                                <i className="fa fa-file" />
                                Generate report
                            </button>
                        </BlockButtonWrapper>
                    </div>
                </div>
            </BlockContainer>
        </div>
        {/* <div className="size-lg-6">
            <SortByContainer />
        </div> */}

        {/* <PinSelectorContainer /> */}
    </Form>
);

export default PinFiltersForm;
