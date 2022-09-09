import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { CREATE_HIERARCHY_ALERT_MODAL } from 'constants/shared/modalTypes';
import { HIERARCHY_IDS } from 'constants/companyAdmin/enums';

const CreateAndViewPinButtons = () => {
    const dispatch = useDispatch();
    const { id: drawingID } = useParams();

    const handleCreateHierarchyAlertModal = () => {
        dispatch(
            showModal(CREATE_HIERARCHY_ALERT_MODAL, {
                hierarchyType: HIERARCHY_IDS.DRAWING,
                hierarchyID: drawingID,
            }),
        );
    };

    return (
        <FlexWrapper justify="end" align="center" gap={11} extraClasses="pin-buttons-container">
            <ButtonWrapper alignment="right">
                <LinkButton
                    text="View Alerts"
                    type="button"
                    href={`/company/drawings/${drawingID}/upcoming-alerts`}
                    source="secondary"
                    ambient="positive"
                    icon="fa fa-eye"
                />
            </ButtonWrapper>

            <ButtonWrapper alignment="right">
                <ActionButton
                    text="Create Alerts"
                    type="button"
                    onClick={handleCreateHierarchyAlertModal}
                    ambient="positive"
                    icon="plus"
                />
            </ButtonWrapper>
        </FlexWrapper>
    );
};

export default CreateAndViewPinButtons;
