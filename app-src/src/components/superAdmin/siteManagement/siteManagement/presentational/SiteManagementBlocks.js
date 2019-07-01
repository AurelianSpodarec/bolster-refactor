import React from 'react';
import SiteManagementMoveFrom from './SiteManagementMoveFrom';
import SiteManagementMoveTo from './SiteManagementMoveTo';

const SiteManagementBlocks = ({
    companies,
    moveFromCompany,
    moveToCompany,
    hierarchies,
    moveFromHierarchy,
    handleChange
}) => (
    <>
        <div className="size-lg-6">
            <SiteManagementMoveFrom
                handleChange={handleChange}
                companies={companies}
                selectedCompany={moveFromCompany}
                hierarchies={hierarchies}
                selectedHierarchy={moveFromHierarchy}
            />
        </div>
        <div className="size-lg-6">
            <SiteManagementMoveTo
                handleChange={handleChange}
                companies={companies}
                selectedCompany={moveToCompany}
            />
        </div>
    </>
);

export default SiteManagementBlocks;
