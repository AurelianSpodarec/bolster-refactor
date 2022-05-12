import React from 'react';
import { Link } from 'react-router-dom';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../../_content/images/icons/trash.svg';

const SiteStats = ({
    site,
    stats,
    handleDelete,
    handleArchive,
    onMobile,
    handleEditSiteModal,
    handleEditSitePinOptionSetsModal,
    handleChange,
    serviceID,
    serviceOptions,
    handleCreateHierarchyAlertModal,
    handleViewHierarchyAlerts,
    handleViewDrawingExpiryModal,
    companyID,
    companyOptions,
    filteredStatsBool,
}) => (
    <div className="stats size-lg-12">
        <div className="flex-item size-lg-12">
            <SiteDetails
                site={site}
                stats={stats}
                handleChange={handleChange}
                serviceOptions={serviceOptions}
                serviceID={serviceID}
            />

            <PieChart
                stats={stats}
                serviceID={serviceID}
                hierarchyType="site"
                sizeClasses="size-lg-6 size-md-12"
                onMobile={onMobile}
                isFiltered={!!serviceID}
                handleChange={handleChange}
                serviceOptions={serviceOptions}
                companyID={companyID}
                companyOptions={companyOptions}
                filteredStatsBool={filteredStatsBool}
            />
        </div>

        <div className="button-container relative-position">
            {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                <>
                    <ActionButton
                        ambient="negative"
                        onClick={handleDelete}
                        type="button"
                        svgIconComponent={TrashIcon}
                        text="Delete"
                    />
                    <button className="button yellow" onClick={handleEditSiteModal}>
                        <i className="far fa-pencil fa-fw" /> Edit
                    </button>

                    <Link className="button" to={`/company/sites/${site.id}/change-ownership`}>
                        <i className="fa fa-exchange" /> Change Ownership
                    </Link>
                    <button className="button red" onClick={handleViewDrawingExpiryModal}>
                        <i className="far fa-clock fa-fw" /> Drawing Expiry
                    </button>
                </>
            )}
            <button className="button yellow" onClick={handleEditSitePinOptionSetsModal}>
                <i className="far fa-pencil fa-fw" /> Edit Pin Options
            </button>
            <button className="button blue" onClick={handleArchive} type="button">
                <i className="fa fa-archive" />
                {site.isArchived ? 'Un-Archive' : 'Archive'}
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

export default SiteStats;
