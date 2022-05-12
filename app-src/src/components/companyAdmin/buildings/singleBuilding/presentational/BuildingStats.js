import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import BuildingDetails from './BuildingDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import { ReactComponent as TrashIcon } from '../../../../../_content/images/icons/trash.svg';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';

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
    handleViewDrawingExpiryModal,
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
                <FlexWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionMenu extraClasses="to-the-right">
                            {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                                <ActionMenuActionButton
                                    onClick={handleViewDrawingExpiryModal}
                                    text="Drawing Expiry"
                                />
                            )}
                            <ActionMenuActionButton
                                onClick={handleArchive}
                                text={building.isArchived ? 'Un-Archive' : 'Archive'}
                            />

                            {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                                <ActionMenuActionButton onClick={handleDelete} text="Delete" />
                            )}
                        </ActionMenu>
                    </ButtonWrapper>
                    <ButtonWrapper>
                        {building.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <ActionButton
                                source="secondary"
                                ambient="positive"
                                onClick={handleEditBuildingModal}
                                type="button"
                                icon="pencil"
                                text="Edit"
                            />
                        )}
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
};

export default BuildingStats;
