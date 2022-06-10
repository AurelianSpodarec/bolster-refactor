import React from 'react';
import { useDispatch } from 'react-redux';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import useAutoRenew from './hooks/useAutoRenew';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import BolsterPlusPodHeading from './BolsterPlusPodHeading';
import { ADD_BOLSTER_PLUS } from 'constants/shared/modalTypes';

const BolsterPlusPod = () => {
    const dispatch = useDispatch();
    const isBolsterPlusActivated = true;

    const { handleAutoRenewChange, isAutoRenew } = useAutoRenew(isAutoRenew);

    return (
        <BlockContainer>
            <FlexWrapper extraClasses="margin-bottom-medium" justify="between">
                <BolsterPlusPodHeading bolsterPlusActivated={isBolsterPlusActivated} />

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
            <p className="size-lg-12">
                Utilise the best features of Bolster Systems to improve your business workflows
            </p>
            {!isBolsterPlusActivated && (
                <>
                    <p className="size-lg-12 heading-large">£3000</p>

                    <p className="size-lg-12 heading">Highlights</p>
                    <p className="size-lg-12">
                        Costing &amp; Estimating (price sites automatically from your schedule of
                        rates)
                    </p>
                    <p>Timesheets + (export timesheet CSVs, set wages for operatives)</p>
                    <p>25 GB </p>
                    <p>Futher user</p>
                    <p>Customised</p>
                    <p>Dedicated</p>
                </>
            )}

            <FlexWrapper align="end">
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="left">
                    <ActionButton text="Learn more" source="secondary" ambient="positive" />
                </ButtonWrapper>
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="right">
                    <ActionButton
                        text="Upgrade"
                        size="medium"
                        onClick={() => dispatch(showModal(ADD_BOLSTER_PLUS))}
                    />
                </ButtonWrapper>
            </FlexWrapper>
        </BlockContainer>
    );
};

export default BolsterPlusPod;
