import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ADD_BOLSTER_PLUS } from 'constants/shared/modalTypes';
import { bolsterPlusLearnMoreLink } from 'constants/companyAdmin/bolsterPlus';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import FlexModalOuter from './FlexModalOuter';
import BolsterPlusHeading from 'components/companyAdmin/subscription/addOns/BolsterPlusHeading';
import BolsterPlusFeatures from 'components/companyAdmin/subscription/addOns/BolsterPlusFeatures';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import LinkButton from '../../button/presentational/LinkButton';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

// handleClose will be used for any extra actions that might be needed when closing the modal (e.g. change tab)
const BolsterPlusUpgradeModal = ({ handleClose, hideModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <FlexModalOuter title="" className="loading-text size-lg-12" hideHeading>
            <div className="flex-content-wrapper content-container">
                <div className="flex-content content-area">
                    <BolsterPlusHeading extraClasses="margin-bottom-medium" />
                    <BolsterPlusFeatures />
                </div>

                <FlexWrapper extraClasses="flex-modal-footer" justify="between">
                    <ButtonWrapper alignment="left">
                        <LinkButton
                            text="Learn More"
                            source="secondary"
                            ambient="positive"
                            href={bolsterPlusLearnMoreLink}
                            isExternalLink
                            openInNewTab
                        />
                    </ButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="No thanks"
                            source="secondary"
                            onClick={() => {
                                if (handleClose) {
                                    handleClose();
                                } else {
                                    history.goBack();
                                }

                                hideModal();
                            }}
                        />
                        <ActionButton
                            text="Upgrade"
                            onClick={() =>
                                dispatch(
                                    showModal(ADD_BOLSTER_PLUS, {
                                        handleClose: () => handleClose(),
                                    }),
                                )
                            }
                        />
                    </ButtonWrapper>
                </FlexWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default BolsterPlusUpgradeModal;
