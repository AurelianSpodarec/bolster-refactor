import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../../_content/images/icons/trash.svg';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

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
            <FlexWrapper gap={5} wrap="wrap">
                {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                    <>
                        <ActionButton
                            ambient="negative"
                            onClick={handleDelete}
                            type="button"
                            svgIconComponent={TrashIcon}
                            text="Delete"
                        />
                        <ActionButton
                            source="secondary"
                            ambient="positive"
                            onClick={handleEditSiteModal}
                            type="button"
                            icon="pencil"
                            text="Edit"
                        />
                        <LinkButton
                            source="secondary"
                            ambient="positive"
                            href={`/company/sites/${site.id}/change-ownership`}
                            icon="exchange"
                            text=" Change Ownership"
                        />
                        <ActionButton
                            source="secondary"
                            ambient="positive"
                            onClick={handleViewDrawingExpiryModal}
                            icon="clock"
                            text="Drawing Expiry"
                        />
                    </>
                )}

                <ActionButton
                    source="secondary"
                    ambient="positive"
                    onClick={handleEditSitePinOptionSetsModal}
                    icon="pencil"
                    text="Edit Pin Options"
                />
                <ActionButton
                    source="secondary"
                    ambient="positive"
                    onClick={handleArchive}
                    icon="archive"
                    text={site.isArchived ? 'Un-Archive' : 'Archive'}
                    type="button"
                />
                <ActionButton
                    source="secondary"
                    ambient="positive"
                    onClick={handleViewHierarchyAlerts}
                    icon="eye"
                    text="View Alerts"
                    type="button"
                />
                <ActionButton
                    ambient="positive"
                    onClick={handleCreateHierarchyAlertModal}
                    icon="plus"
                    text="Create Alert"
                    type="button"
                />
            </FlexWrapper>
        </div>
    </div>
);

export default SiteStats;
