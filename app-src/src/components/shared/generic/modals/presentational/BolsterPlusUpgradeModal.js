import React from 'react';
import { useDispatch } from 'react-redux';

import { ADD_BOLSTER_PLUS } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import FlexModalOuter from './FlexModalOuter';
import BolsterPlusHeading from 'components/companyAdmin/subscription/bolsterPlus/BolsterPlusHeading';
import BolsterPlusFeatures from 'components/companyAdmin/subscription/bolsterPlus/BolsterPlusFeatures';
import ButtonWrapper from '../../button/presentational/ButtonWrapper';
import ActionButton from '../../button/presentational/ActionButton';
import FlexWrapper from '../../flexWrapper/FlexWrapper';

const BolsterPlusUpgradeModal = () => {
    const dispatch = useDispatch();

    return (
        <FlexModalOuter title="" className="loading-text size-lg-12" hideHeading>
            <div className="flex-content-wrapper content-container">
                <div className="flex-content content-area">
                    <BolsterPlusHeading extraClasses="margin-bottom-medium" />
                    <BolsterPlusFeatures />
                </div>

                <FlexWrapper extraClasses="flex-modal-footer" justify="between">
                    <ButtonWrapper alignment="left">
                        <ActionButton
                            text="Learn More"
                            source="secondary"
                            ambient="positive"
                            onClick={() => {}}
                        />
                    </ButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton text="No thanks" source="secondary" onClick={() => {}} />
                        <ActionButton
                            text="Upgrade"
                            onClick={() => dispatch(showModal(ADD_BOLSTER_PLUS))}
                        />
                    </ButtonWrapper>
                </FlexWrapper>
            </div>
        </FlexModalOuter>
    );
};

export default BolsterPlusUpgradeModal;
