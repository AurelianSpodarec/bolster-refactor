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

const PinFiltersForm = ({
    futherFiltrationOptions,
    selectedFutherFiltration,
    handleFurtherFiltrationChange,
    filterOption,
    handleSubmit
}) => (
    <Form className="generic-form " onSubmit={() => handleSubmit()}>
        <LevelsFilterContainer />
        <StatusTypeFilterContainer />
        <ServicesFilterContainer />
        <DatesFilterContainer />
        <FurtherFiltration
            futherFiltrationOptions={futherFiltrationOptions}
            selectedFutherFiltration={selectedFutherFiltration}
            handleChange={handleFurtherFiltrationChange}
        />
        <ReportOptionsContainer />

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
