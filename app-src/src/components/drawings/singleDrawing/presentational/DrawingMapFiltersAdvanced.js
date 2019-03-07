import React from 'react';

import Filter from 'components/shared/generic/form/presentational/Filter';

const DrawingMapFiltersAdvanced = ({
    serviceTypeOptions,
    serviceTypeSelected
}) => (
    <div className="size-lg-12">
        <Filter
            options={serviceTypeOptions}
            selectedOption={serviceTypeSelected}
        />
    </div>
);

export default DrawingMapFiltersAdvanced;
