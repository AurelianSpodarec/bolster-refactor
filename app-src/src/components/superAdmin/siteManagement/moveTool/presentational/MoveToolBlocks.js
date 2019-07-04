import React from 'react';
import MoveToolMoveFrom from './MoveToolMoveFrom';
import MoveToolMoveTo from './MoveToolMoveTo';

const MoveToolBlocks = ({
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
            <MoveToolMoveFrom
                handleChange={handleCompanyOneChange}
                handleHierarchyChange={handleHierarchyChange}
                companies={companies}
                selectedCompany={moveFromCompany}
                hierarchies={hierarchies}
                selectedHierarchy={selectedHierarchy}
            />
        </div>
        <div className="size-lg-6">
            <MoveToolMoveTo
                handleChange={handleChange}
                companies={companies}
                moveFromCompany={moveFromCompany}
                selectedCompany={moveToCompany}
                selectedHierarchy={selectedHierarchy}
            />
        </div>
    </>
);

export default MoveToolBlocks;
