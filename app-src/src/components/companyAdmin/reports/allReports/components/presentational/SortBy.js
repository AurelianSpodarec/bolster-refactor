import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const SortBy = ({ sortByOptions, selectedSortBy, handleChange }) => (
    <Field name="Sort by">
        <DropdownContainer
            placeholder="Please select"
            name="sortByID"
            options={sortByOptions}
            selectedOption={selectedSortBy}
            handleChange={handleChange}
        />
    </Field>
);

export default SortBy;
