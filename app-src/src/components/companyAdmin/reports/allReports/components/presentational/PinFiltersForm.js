import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import Form from 'components/shared/generic/form/containers/Form';
import MultiDropdownContainer from 'components/shared/generic/form/containers/MultiDropdownContainer';
import DatePicker from 'components/shared/generic/form/presentational/DatePicker';
import LevelsFilterContainer from '../containers/LevelsFilterContainer';
import StatusTypeFilterContainer from '../containers/StatusTypeFilterContainer';
import ServicesFilterContainer from '../containers/ServicesFilterContainer';

const PinFiltersForm = () => (
    <Form className="generic-form ">
        <LevelsFilterContainer />
        <StatusTypeFilterContainer />
        <ServicesFilterContainer />
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
