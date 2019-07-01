import React from 'react';
import SiteManagementMoveFrom from './SiteManagementMoveFrom';
import SiteManagementMoveTo from './SiteManagementMoveTo';

const SiteManagementBlocks = ({
    companies,
    moveFromCompany,
    moveToCompany,
    hierarchies,
    selectedHierarchy,
    handleChange,
    handleCompanyOneChange,
    handleHierarchyChange
}) => (
    <>
        <div className="size-lg-6">
            <SiteManagementMoveFrom
                handleChange={handleCompanyOneChange}
                handleHierarchyChange={handleHierarchyChange}
                companies={companies}
                selectedCompany={moveFromCompany}
                hierarchies={hierarchies}
                selectedHierarchy={selectedHierarchy}
            />
        </div>
        <div className="size-lg-6">
            <SiteManagementMoveTo
                handleChange={handleChange}
                companies={companies}
                selectedCompany={moveToCompany}
                selectedHierarchy={selectedHierarchy}
            />
        </div>
    </>
);

export default SiteManagementBlocks;
