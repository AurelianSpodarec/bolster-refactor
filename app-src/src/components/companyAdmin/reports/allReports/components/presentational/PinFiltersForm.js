import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import StatusTypeFilterContainer from '../containers/StatusTypeFilterContainer';
import ServicesFilterContainer from '../containers/ServicesFilterContainer';
import DatesFilterContainer from '../containers/DatesFilterContainer';
import FurtherFiltration from './FurtherFiltration';
import ReportOptionsContainer from '../containers/ReportOptionsContainer';
import PinSelectorContainer from 'components/shared/pinSelector/container/PinSelectorContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import NumberOfHistoriesContainer from '../containers/NumberOfHistoriesContainer';
import SortByContainer from '../containers/SortByContainer';
import ReportFormatsContainer from '../containers/ReportFormatsContainer';

const PinFiltersForm = ({
    futherFiltrationOptions,
    selectedFutherFiltration,
    handleFurtherFiltrationChange,
    filterOption,
    handleSubmit
}) => (
    <Form className="generic-form " onSubmit={() => handleSubmit()}>
        <div className="size-lg-12">
            <div className="size-lg-6">
                <LevelsFilterContainer />
            </div>
            <div className="size-lg-6">
                <StatusTypeFilterContainer />
                <ServicesFilterContainer />
                <FurtherFiltration
                    futherFiltrationOptions={futherFiltrationOptions}
                    selectedFutherFiltration={selectedFutherFiltration}
                    handleChange={handleFurtherFiltrationChange}
                />
                <NumberOfHistoriesContainer />
            </div>
        </div>
        <div className="size-lg-6">
            <SortByContainer />
        </div>
        <div className="size-lg-6">
            <DatesFilterContainer />
        </div>
        <div className="size-lg-6">
            <ReportFormatsContainer />
        </div>

        {filterOption === '2' && <PinSelectorContainer />}
        <Field title="Service">
            {/* <Dropdown placeholder="Firestopping" name="service" /> */}
        </Field>
        <Field title="Status">
            {/* <Dropdown placeholder="All" name="status" /> */}
        </Field>
        <Field title="Operative">
            {/* <MultiDropdownContainer
                required={true}
                options={}
                value={}
                name="operative"
                handleChange={}
            /> */}
        </Field>
        <Field title="Date Range">
            {/* <DatePicker
                name="startOn"
                selected={startOn}
                onChange={e => onChange(e, 'startOn')}
                placeholderText="Start date"
            /> */}
        </Field>

        <BlockButtonWrapper>
            <button className="button green" type="submit">
                <i className="fa fa-file" />
                Generate report
            </button>
        </BlockButtonWrapper>
    </Form>
);

export default PinFiltersForm;
