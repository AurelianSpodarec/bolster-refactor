import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Select from 'components/shared/generic/form/presentational/Select';

const CompaniesFilter = ({ handleFormChange, companies, createdByCompanyID }) => (
    <div className="generic-form size-lg-12">
        <Field name="Companies">
            <Select
                options={companies}
                name="createdByCompanyID"
                onChange={handleFormChange}
                value={createdByCompanyID}
                search
                placeholder="All Companies"
            />
        </Field>
    </div>
);

export default CompaniesFilter;
