import React from 'react';
import { useDispatch } from 'react-redux';

import { ADD_BOLSTER_PLUS } from 'constants/shared/modalTypes';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import useAutoRenew from './hooks/useAutoRenew';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import BolsterPlusHeading from './BolsterPlusHeading';
import BolsterPlusFeatures from './BolsterPlusFeatures';

const BolsterPlusPod = () => {
    const dispatch = useDispatch();
    const isBolsterPlusActivated = false;

    const { handleAutoRenewChange, isAutoRenew } = useAutoRenew(isAutoRenew);

    return (
        <BlockContainer>
            <FlexWrapper extraClasses="margin-bottom-medium" justify="between">
                <BolsterPlusHeading bolsterPlusActivated={isBolsterPlusActivated} />

                {isBolsterPlusActivated && (
                    <CheckboxContainer
                        name={'isAutoRenew'}
                        text="Auto-Renewal"
                        value={isAutoRenew}
                        handleChange={handleAutoRenewChange}
                        checked={!!isAutoRenew}
                        classes="auto-width"
                        labelToTheLeft
                        forceOnOneLine
                    />
                )}
            </FlexWrapper>

            <BolsterPlusFeatures bolsterPlusActivated={isBolsterPlusActivated} />

            <FlexWrapper align="end">
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="left">
                    <ActionButton text="Learn more" source="secondary" ambient="positive" />
                </ButtonWrapper>
                {!isBolsterPlusActivated && (
                    <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="right">
                        <ActionButton
                            text="Upgrade"
                            size="medium"
                            onClick={() => dispatch(showModal(ADD_BOLSTER_PLUS))}
                        />
                    </ButtonWrapper>
                )}
            </FlexWrapper>
        </BlockContainer>
    );
};

export default BolsterPlusPod;
