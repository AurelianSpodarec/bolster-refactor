import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import BuildingDetails from './BuildingDetails';

const BuildingStats = ({
    building,
    stats,
    handleDelete,
    handleArchive,
    handleEditBuildingModal
}) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <BuildingDetails stats={stats} building={building} />
            <PieChart stats={stats} hierarchyType="building" />
        </div>

        <div className="button-container">
            <button className="button red" type="button" onClick={handleDelete}>
                <i className="far fa-trash-alt fa-fw" /> Delete
            </button>
            <button className="button yellow" onClick={handleEditBuildingModal}>
                <i className="far fa-pencil fa-fw" /> Edit
            </button>

            <button
                className="button blue"
                onClick={handleArchive}
                type="button"
            >
                <i className="fa fa-archive" />
                {building.isArchived ? 'Un-Archive' : 'Archive'}
            </button>
        </div>
    </div>
);

export default BuildingStats;
