import React from 'react';
import { useDispatch } from 'react-redux';

import { ADD_BOLSTER_PLUS } from 'constants/shared/modalTypes';
import { bolsterPlusLearnMoreLink } from 'constants/companyAdmin/bolsterPlus';

import showModal from 'actions/shared/generic/modals/sync/showModal';

import useAutoRenew from './hooks/useBolsterPlusAutoRenew';
import useBolsterPlus from './hooks/useBolsterPlus';

import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import LinkButton from 'components/shared/generic/button/presentational/LinkButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import BolsterPlusHeading from './BolsterPlusHeading';
import BolsterPlusFeatures from './BolsterPlusFeatures';

const BolsterPlusPodInner = () => {
    const dispatch = useDispatch();
    const { isBolsterPlusActivated, isSubscriptionsActivated } = useBolsterPlus();
    const { handlesAutoRenewChange, isAutoRenewSubscription, form } = useAutoRenew();

    return (
        <>
            <FlexWrapper extraClasses="margin-bottom-medium" justify="between">
                <BolsterPlusHeading bolsterPlusActivated={isBolsterPlusActivated} />

                {isBolsterPlusActivated && isAutoRenewSubscription && (
                    <CheckboxContainer
                        name="renewalStatus"
                        text="Auto-Renewal"
                        handleChange={handlesAutoRenewChange}
                        checked={form.renewalStatus}
                        classes="auto-width"
                        labelToTheLeft
                        forceOnOneLine
                    />
                )}
            </FlexWrapper>

            <BolsterPlusFeatures bolsterPlusActivated={isBolsterPlusActivated} />

            <FlexWrapper align="end">
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="left">
                    <LinkButton
                        text="Learn More"
                        source="secondary"
                        ambient="positive"
                        href={bolsterPlusLearnMoreLink}
                        isExternalLink
                        openInNewTab
                    />
                </ButtonWrapper>
                {!isBolsterPlusActivated && isSubscriptionsActivated && (
                    <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="right">
                        <ActionButton
                            text="Upgrade"
                            size="medium"
                            onClick={() => dispatch(showModal(ADD_BOLSTER_PLUS))}
                        />
                    </ButtonWrapper>
                )}
            </FlexWrapper>
        </>
    );
};

export default BolsterPlusPodInner;
