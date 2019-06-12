import React from 'react';

import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';
import Loading from 'components/shared/generic/misc/presentational/Loading';

const LevelFilters = ({
    handleChange,
    siteOptions,
    selectedSite,
    buildingOptions,
    selectedBuilding,
    floorOptions,
    selectedFloor,
    drawingOptions,
    selectedDrawing,
    hierarchy,
    isFetching
}) => (
    <div className="levels-filter size-lg-12">
        <div className="generic-form">
            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <Field name="Sites" classes="active">
                        <DropdownContainer
                            placeholder="All Sites"
                            name="siteID"
                            options={siteOptions}
                            value={selectedSite}
                            selectedOption={selectedSite}
                            handleChange={handleChange}
                            disabled={!!hierarchy}
                        />
                    </Field>
                    {!selectedSite || hierarchy > HIERARCHY_IDS.SITE ? (
                        ''
                    ) : (
                        <Field
                            name="Buildings"
                            classes={selectedSite ? 'active' : ''}
                        >
                            <DropdownContainer
                                placeholder="All Buildings"
                                name="buildingID"
                                options={buildingOptions}
                                value={selectedBuilding}
                                selectedOption={selectedBuilding}
                                handleChange={handleChange}
                            />
                        </Field>
                    )}
                    {!selectedBuilding || hierarchy > HIERARCHY_IDS.BUILDING ? (
                        ''
                    ) : (
                        <Field
                            name="Floors"
                            classes={selectedBuilding ? 'active' : ''}
                        >
                            <DropdownContainer
                                placeholder="All Floors"
                                name="floorID"
                                options={floorOptions}
                                value={selectedFloor}
                                selectedOption={selectedFloor}
                                handleChange={handleChange}
                            />
                        </Field>
                    )}
                    {!selectedFloor || hierarchy > HIERARCHY_IDS.FLOOR ? (
                        ''
                    ) : (
                        <Field
                            name="Drawings"
                            classes={selectedFloor ? 'active' : ''}
                        >
                            <DropdownContainer
                                placeholder="All Drawings"
                                name="drawingID"
                                options={drawingOptions}
                                value={selectedDrawing}
                                selectedOption={selectedDrawing}
                                handleChange={handleChange}
                            />
                        </Field>
                    )}
                </>
            )}
        </div>
    </div>
);

export default LevelFilters;
