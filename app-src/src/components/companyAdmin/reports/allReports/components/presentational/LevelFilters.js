import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const LevelFilters = ({
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
                    placeholder="All Sites"
                    name="siteID"
                    options={siteOptions}
                    selectedOption={selectedSite}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Buildings" classes={selectedSite ? 'active' : ''}>
                <DropdownContainer
                    disabled={!selectedSite}
                    placeholder="All Buildings"
                    name="buildingID"
                    options={buildingOptions}
                    selectedOption={selectedBuilding}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Floors" classes={selectedBuilding ? 'active' : ''}>
                <DropdownContainer
                    disabled={!selectedBuilding}
                    placeholder="All Floors"
                    name="floorID"
                    options={floorOptions}
                    selectedOption={selectedFloor}
                    handleChange={handleChange}
                />
            </Field>
            <Field name="Drawings" classes={selectedFloor ? 'active' : ''}>
                <DropdownContainer
                    disabled={!selectedFloor}
                    placeholder="All Drawings"
                    name="drawingID"
                    options={drawingOptions}
                    selectedOption={selectedDrawing}
                    handleChange={handleChange}
                />
            </Field>
        </div>
    </div>
);

export default LevelFilters;
