import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import StatusTypeFilterContainer from '../containers/StatusTypeFilterContainer';
import ServicesFilterContainer from '../containers/ServicesFilterContainer';
import DatesFilterContainer from '../containers/DatesFilterContainer';
import FurtherFiltration from './FurtherFiltration';
import ReportOptionsContainer from '../containers/ReportOptionsContainer';

const PinFiltersForm = ({
    futherFiltrationOptions,
    selectedFutherFiltration,
    handleFurtherFiltrationChange,
    filterOption
}) => (
    <Form className="generic-form ">
        <LevelsFilterContainer />
        <StatusTypeFilterContainer />
        <ServicesFilterContainer />
        <DatesFilterContainer />
        <FurtherFiltration
            futherFiltrationOptions={futherFiltrationOptions}
            selectedFutherFiltration={selectedFutherFiltration}
            handleChange={handleFurtherFiltrationChange}
        />
        {filterOption === '1' && <ReportOptionsContainer />}
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
    </Form>
);

export default PinFiltersForm;
