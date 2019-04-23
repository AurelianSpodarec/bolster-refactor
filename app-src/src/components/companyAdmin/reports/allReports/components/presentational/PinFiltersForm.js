import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import StatusTypeFilterContainer from '../containers/StatusTypeFilterContainer';
import ServicesFilterContainer from '../containers/ServicesFilterContainer';
import DatesFilterContainer from '../containers/DatesFilterContainer';
import FurtherFiltration from './FurtherFiltration';
// import ReportOptionsContainer from '../containers/ReportOptionsContainer';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import NumberOfHistoriesContainer from '../containers/NumberOfHistoriesContainer';
// import SortByContainer from '../containers/SortByContainer';
import ReportFormatsContainer from '../containers/ReportFormatsContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import CustomFiltersContainer from '../containers/CustomFiltersContainer';
import OperativesFilterContainer from '../containers/OperativesFilterContainer';
import FurtherFiltrationContainer from '../containers/FurtherFiltrationContainer';

const PinFiltersForm = ({
    furtherFiltrationOptions,
    selectedfurtherFiltration,
    handleFurtherFiltrationChange,
    filterOption,
    handleSubmit
}) => (
    <Form className="size-lg-12" onSubmit={handleSubmit}>
        <div className="flex-container size-lg-12">
            <div className="flex-item size-lg-6">
                <BlockContainer>
                    <div className="size-lg-12">
                        <LevelsFilterContainer />
                        <OperativesFilterContainer />
                    </div>
                </BlockContainer>
            </div>
            <div className="flex-item size-lg-6">
                <BlockContainer>
                    <div className="size-lg-12">
                        <ServicesFilterContainer />
                        <StatusTypeFilterContainer />
                        <DatesFilterContainer />
                    </div>
                </BlockContainer>
            </div>
        </div>

        <div className="size-lg-12">
            <BlockContainer>
                <FurtherFiltrationContainer
                    filterOption={filterOption}
                    furtherFiltrationOptions={furtherFiltrationOptions}
                    selectedfurtherFiltration={selectedfurtherFiltration}
                    handleChange={handleFurtherFiltrationChange}
                />
            </BlockContainer>
        </div>
        <div className="size-lg-12">
            <BlockContainer>
                <div className="size-lg-6">
                    <ReportFormatsContainer />
                </div>
                <div className="size-lg-6">
                    <NumberOfHistoriesContainer />
                    <p className="generic-text size-lg-12">
                        Show Hidden Checkbox
                    </p>
                </div>
                <BlockButtonWrapper>
                    <button className="button green" type="submit">
                        <i className="fa fa-file" />
                        Generate report
                    </button>
                </BlockButtonWrapper>
            </BlockContainer>
        </div>
        {/* <div className="size-lg-6">
            <SortByContainer />
        </div> */}

        {/* <PinSelectorContainer /> */}
    </Form>
);

export default PinFiltersForm;
