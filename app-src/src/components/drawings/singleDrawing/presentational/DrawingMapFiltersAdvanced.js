import React from 'react';

import Filter from 'components/shared/generic/form/presentational/Filter';

const DrawingMapFiltersAdvanced = ({
    serviceTypeOptions,
    serviceTypeSelected
}) => (
    <div className="form size-lg-12">
        <div className="size-lg-8">
            <div className="size-lg-6">
                <Filter
                    title="Service type"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Status"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Time period"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                />
            </div>

            <div className="size-lg-6">
                <Filter
                    title="Operative"
                    options={serviceTypeOptions}
                    selectedOption={serviceTypeSelected}
                />
            </div>
        </div>
    </div>
);

export default DrawingMapFiltersAdvanced;
