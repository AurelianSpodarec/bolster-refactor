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
    onMobile,
    handleChange,
    serviceID,
    serviceOptions,
    handleViewDrawingExpiryModal,
}) => (
    <div className="stats size-lg-12">
        <FloorDetails stats={stats} floor={floor} />
        <PieChart
            stats={stats}
            hierarchyType="floor"
            sizeClasses="size-lg-6 size-md-12"
            onMobile={onMobile}
            handleChange={handleChange}
            serviceOptions={serviceOptions}
            serviceID={serviceID}
        />

        <div className="button-container relative-position">
            {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
                <>
                    <button className="button red" type="button" onClick={handleDelete}>
                        <i className="far fa-trash-alt fa-fw" /> Delete
                    </button>
                    <button className="button yellow" onClick={handleEditFloorModal}>
                        <i className="far fa-pencil fa-fw" /> Edit
                    </button>
                    <button className="button yellow" onClick={handleViewDrawingExpiryModal}>
                        <i className="far fa-clock fa-fw" /> Drawing Expiry
                    </button>
                </>
            )}

            <button className="button blue" onClick={handleArchive} type="button">
                <i className="fa fa-archive" />
                {floor.isArchived ? 'Un-Archive' : 'Archive'}
            </button>
        </div>
    </div>
);

export default FloorStats;
