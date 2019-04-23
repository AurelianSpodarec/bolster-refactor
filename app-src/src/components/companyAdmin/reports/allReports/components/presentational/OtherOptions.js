import React from 'react';
import Checkbox from 'components/shared/generic/form/presentational/Checkbox';
import Field from 'components/shared/generic/form/presentational/Field';
import NewSelect from 'components/shared/generic/form/presentational/NewSelect';

const OtherOptions = ({
    options: { showHidden, sortBy, layout },
    handleChange,
    handleChangeSelect,
    sortByOptions,
    layoutOptions
}) => (
    <>
        <Field name="Show hidden?">
            <Checkbox
                checked={showHidden}
                handleChange={handleChange}
                name="showHidden"
            />
        </Field>
        <Field name="Sort by">
            <NewSelect
                name="sortBy"
                options={sortByOptions}
                singleSelect={true}
                onChange={handleChangeSelect}
                value={sortBy}
            />
        </Field>
        <Field name="Layout">
            <NewSelect
                name="layout"
                options={layoutOptions}
                singleSelect={true}
                onChange={handleChangeSelect}
                value={layout}
            />
        </Field>
    </>
);

export default OtherOptions;
