import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

const BolsterPlusPod = () => {
    const isBolsterPlusActivated = true;
    return (
        <BlockContainer>
            <BlockHeading title="Bolster plus" />
            <p className="size-lg-12">
                Utilise the best features of Bolster Systems to improve your business workflows
            </p>
            <p className="size-lg-12 heading">£3000</p>

            {isBolsterPlusActivated && (
                <>
                    <p className="size-lg-12">Highlights</p>
                    <h1 className="size-lg-12">
                        Costing &amp; Estimating (price sites automatically from your schedule of
                        rates)
                    </h1>
                    <h1>Timesheets + (export timesheet CSVs, set wages for operatives)</h1>
                    <h1>25 GB </h1>
                    <h1>Futher user</h1>
                    <h1>Customised</h1>
                    <h1>Dedicated</h1>
                </>
            )}

            <FlexWrapper align="end">
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="left">
                    <ActionButton text="Learn more" source="secondary" ambient="positive" />
                </ButtonWrapper>
                <ButtonWrapper extraClasses="size-lg-6 margin-top" alignment="right">
                    <ActionButton text="Upgrade" size="medium" />
                </ButtonWrapper>
            </FlexWrapper>
        </BlockContainer>
    );
};

export default BolsterPlusPod;
