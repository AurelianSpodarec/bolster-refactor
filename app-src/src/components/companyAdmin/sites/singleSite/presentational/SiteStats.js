import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import SiteDetails from './SiteDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../../_content/images/icons/trash.svg';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuLinkButton from 'components/shared/actionMenu/ActionMenuLinkButton';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';

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
            <FlexWrapper>
                <ButtonWrapper alignment="right">
                    <ActionMenu extraClasses="to-the-right">
                        {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <>
                                <ActionMenuLinkButton
                                    href={`/company/sites/${site.id}/change-ownership`}
                                    text="Change Ownership"
                                />
                                <ActionMenuActionButton
                                    onClick={handleViewDrawingExpiryModal}
                                    text="Drawing Expiry"
                                />
                            </>
                        )}
                        <ActionMenuActionButton
                            onClick={() => console.log(handleArchive)}
                            text={site.isArchived ? 'Un-Archive' : 'Archive'}
                        />
                        {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <ActionMenuActionButton onClick={handleDelete} text="Delete" />
                        )}
                    </ActionMenu>
                    {site.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <ActionButton
                            source="secondary"
                            ambient="positive"
                            onClick={handleEditSiteModal}
                            type="button"
                            icon="pencil"
                            text="Edit"
                        />
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
                </ButtonWrapper>
            </FlexWrapper>
        </div>
    </div>
);

export default SiteStats;
