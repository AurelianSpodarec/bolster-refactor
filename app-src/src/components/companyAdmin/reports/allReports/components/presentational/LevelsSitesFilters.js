import React from 'react';

import Search from 'components/shared/generic/form/presentational/Search';
import Dropdown from 'components/shared/generic/form/presentational/Dropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelsSitesFilters = ({
    sitesOptions,
    selectedSite,
    handleSitesChange
}) => (
    <form className="table-search size-lg-12">
        <Field>
            <DropdownContainer
                placeholder="-- select --"
                name="siteID"
                options={sitesOptions}
                selectedOption={selectedSite}
                handleChange={handleSitesChange}
                required
            />
        </Field>
    </form>
);

export default LevelsSitesFilters;
