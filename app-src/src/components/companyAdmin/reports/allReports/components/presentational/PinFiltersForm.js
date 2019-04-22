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
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import CustomFiltersContainer from '../containers/CustomFiltersContainer';

const PinFiltersForm = ({
    futherFiltrationOptions,
    selectedFutherFiltration,
    handleFurtherFiltrationChange,
    filterOption,
    handleSubmit
}) => (
    <Form className="size-lg-12" onSubmit={() => handleSubmit()}>
        <div className="size-lg-6">
            <BlockContainer>
                <LevelsFilterContainer />
                <p className="generic-text size-lg-12">Operatives</p>
            </BlockContainer>
        </div>
        <div className="size-lg-6">
            <BlockContainer>
                <ServicesFilterContainer />
                <StatusTypeFilterContainer />
                <DatesFilterContainer />
            </BlockContainer>
        </div>
        <div className="size-lg-12">
            <BlockContainer>
                <FurtherFiltration
                    futherFiltrationOptions={futherFiltrationOptions}
                    selectedFutherFiltration={selectedFutherFiltration}
                    handleChange={handleFurtherFiltrationChange}
                />
                {filterOption === '1' && <PinSelectorContainer />}
                <CustomFiltersContainer />
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
