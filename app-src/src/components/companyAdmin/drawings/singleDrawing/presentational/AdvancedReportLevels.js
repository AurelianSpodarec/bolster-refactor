import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const AdvancedReportLevels = ({
    handleChange,
    siteOptions,
    selectedSite,
    buildingOptions,
    selectedBuilding,
    floorOptions,
    selectedFloor,
    drawingOptions,
    selectedDrawing
}) => (
    <div className="levels-filter size-lg-12">
        <div className="generic-form">
            <Field name="Sites" classes="active">
                <DropdownContainer
                    disabled
                    placeholder="All Sites"
                    name="siteID"
                    options={siteOptions}
                    value={selectedSite}
                    selectedOption={selectedSite}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Buildings" classes={selectedSite ? 'active' : ''}>
                <DropdownContainer
                    disabled
                    placeholder="All Buildings"
                    name="buildingID"
                    options={buildingOptions}
                    value={selectedBuilding}
                    selectedOption={selectedBuilding}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Floors" classes={selectedBuilding ? 'active' : ''}>
                <DropdownContainer
                    disabled
                    placeholder="All Floors"
                    name="floorID"
                    options={floorOptions}
                    value={selectedFloor}
                    selectedOption={selectedFloor}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Drawings" classes={selectedFloor ? 'active' : ''}>
                <DropdownContainer
                    disabled
                    placeholder="All Drawings"
                    name="drawingID"
                    options={drawingOptions}
                    value={selectedDrawing}
                    selectedOption={selectedDrawing}
                    handleChange={handleChange}
                />
            </Field>
        </div>
    </div>
);

export default AdvancedReportLevels;
