import React from 'react';
import PieChart from 'components/shared/stats/presentational/PieChart';
import BuildingDetails from './BuildingDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const BuildingStats = ({
    building,
    stats,
    handleDelete,
    handleArchive,
    handleEditBuildingModal,
    onMobile,
    handleChange,
    serviceID,
    serviceOptions,
    handleCreateHierarchyAlertModal,
    handleViewHierarchyAlerts,
    companyID,
    companyOptions,
    filteredStatsBool,
}) => {
    return (
        <div className="stats size-lg-12">
            <div className="flex-item size-lg-12">
                <BuildingDetails stats={stats} building={building} />
                <PieChart
                    stats={stats}
                    hierarchyType="building"
                    onMobile={onMobile}
                    sizeClasses="size-lg-6 size-md-12"
                    isFiltered={!!serviceID}
                    handleChange={handleChange}
                    serviceOptions={serviceOptions}
                    serviceID={serviceID}
                    companyID={companyID}
                    companyOptions={companyOptions}
                    filteredStatsBool={filteredStatsBool}
                />
            </div>

            <div className="button-container relative-position">
                {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                    <>
                        <button className="button red" type="button" onClick={handleDelete}>
                            <i className="far fa-trash-alt fa-fw" /> Delete
                        </button>
                        <button className="button yellow" onClick={handleEditBuildingModal}>
                            <i className="far fa-pencil fa-fw" /> Edit
                        </button>
                    </>
                )}

            <button className="button blue" onClick={handleArchive} type="button">
                <i className="fa fa-archive" />
                {building.isArchived ? 'Un-Archive' : 'Archive'}
            </button>

            <button className="button yellow" type="button" onClick={handleViewHierarchyAlerts}>
                <i className="fa fa-eye" />
                View Alerts
            </button>

            <button
                className="button green"
                type="button"
                onClick={handleCreateHierarchyAlertModal}
            >
                <i className="fa fa-plus" />
                Create Alert
            </button>
            </div>
        </div>
    );
};

export default BuildingStats;
