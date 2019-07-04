import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const FloorStats = ({
    floor,
    stats,
    handleDelete,
    handleArchive,
    handleEditFloorModal,
    onMobile
}) => (
    <div className="stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart
            stats={stats}
            hierarchyType="floor"
            sizeClasses="size-lg-6 size-md-12"
            onMobile={onMobile}
        />
        {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
            <div className="button-container">
                <button
                    className="button red"
                    type="button"
                    onClick={handleDelete}
                >
                    <i className="far fa-trash-alt fa-fw" /> Delete
                </button>
                <button
                    className="button yellow"
                    onClick={handleEditFloorModal}
                >
                    <i className="far fa-pencil fa-fw" /> Edit
                </button>

                <button
                    className="button blue"
                    onClick={handleArchive}
                    type="button"
                >
                    <i className="fa fa-archive" />
                    {floor.isArchived ? 'Un-Archive' : 'Archive'}
                </button>
            </div>
        )}
    </div>
);

export default FloorStats;
