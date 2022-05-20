import React from 'react';

import PieChart from 'components/shared/stats/presentational/PieChart';
import FloorDetails from './FloorDetails';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionMenu from 'components/shared/actionMenu/ActionMenu';
import ActionMenuActionButton from 'components/shared/actionMenu/ActionMenuActionButton';

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
    companyID,
    companyOptions,
    filteredStatsBool,
    handleCreateHierarchyAlertModal,
    handleViewHierarchyAlerts,
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
            companyID={companyID}
            companyOptions={companyOptions}
            filteredStatsBool={filteredStatsBool}
        />

        <div className="button-container relative-position">
            <FlexWrapper>
                <ButtonWrapper alignment="right">
                    <ActionMenu extraClasses="to-the-right">
                        {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <ActionMenuActionButton
                                onClick={handleViewDrawingExpiryModal}
                                text="Drawing Expiry"
                            />
                        )}
                        <ActionMenuActionButton
                            onClick={handleArchive}
                            text={floor.isArchived ? 'Un-Archive' : 'Archive'}
                        />

                        {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
                            <ActionMenuActionButton
                                onClick={handleDelete}
                                text="Delete"
                                isNegative
                            />
                        )}
                    </ActionMenu>
                </ButtonWrapper>
                <ButtonWrapper>
                    {floor.accessType === ACCESS_TYPES_VALUES.OWNER && (
                        <ActionButton
                            source="secondary"
                            ambient="positive"
                            onClick={handleEditFloorModal}
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

export default FloorStats;
