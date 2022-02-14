import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import MultiSelect from 'components/shared/generic/form/presentational/MultiSelect';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

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
    isFetching,
}) => (
    <div className="levels-filter size-lg-12">
        <div className="generic-form">
            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <Field name="Sites" classes="active">
                        <MultiSelect
                            placeholder="All Sites"
                            name="siteID"
                            options={siteOptions}
                            value={selectedSite}
                            onChange={handleChange}
                            disabled={hierarchy >= HIERARCHY_IDS.SITE}
                            search
                        />
                    </Field>

                    <Field name="Buildings" classes={selectedSite ? 'active' : ''}>
                        <MultiSelect
                            placeholder="All Buildings"
                            name="buildingID"
                            options={buildingOptions}
                            value={selectedBuilding}
                            onChange={handleChange}
                            disabled={hierarchy >= HIERARCHY_IDS.BUILDING}
                            search
                        />
                    </Field>

                    <Field name="Floors" classes={selectedBuilding ? 'active' : ''}>
                        <MultiSelect
                            placeholder="All Floors"
                            name="floorID"
                            options={floorOptions}
                            value={selectedFloor}
                            disabled={hierarchy >= HIERARCHY_IDS.FLOOR}
                            onChange={handleChange}
                            search
                        />
                    </Field>

                    <Field name="Drawings" classes={selectedFloor ? 'active' : ''}>
                        <MultiSelect
                            placeholder="All Drawings"
                            name="drawingID"
                            options={drawingOptions}
                            value={selectedDrawing}
                            disabled={hierarchy === HIERARCHY_IDS.DRAWING}
                            onChange={handleChange}
                            search
                        />
                    </Field>
                </>
            )}
        </div>
    </div>
);

export default LevelFilters;
