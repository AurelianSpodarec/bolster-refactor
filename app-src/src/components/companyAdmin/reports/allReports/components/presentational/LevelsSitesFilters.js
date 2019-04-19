import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsSitesFilters = ({ sitesOptions, selectedSite, handleChange }) => (
    <>
        <Field name="Site">
            <DropdownContainer
                placeholder="-- select --"
                name="siteID"
                options={sitesOptions}
                selectedOption={selectedSite}
                handleChange={handleChange}
                required
            />
        </Field>
    </>
);

export default LevelsSitesFilters;
