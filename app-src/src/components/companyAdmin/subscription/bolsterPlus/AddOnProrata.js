import React from 'react';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import useAddOnProrata from './hooks/useAddOnProrata';

const AddOnProrata = () => {
    const { addonProrataCost } = useAddOnProrata();

    return (
        <BlockContainer>
            <p>{`Current Annual Cost - £${addonProrataCost.currentAnnualCost}`}</p>
            <p>{`Current Annual Cost With VAT - £${addonProrataCost.currentAnnualCostWithVAT}`}</p>
            <p>{`New Annual Cost- £${addonProrataCost.newAnnualCost}`}</p>
            <p>{`New Annual Cost With VAT- £${addonProrataCost.newAnnualCostWithVAT}`}</p>
            <p>{`Pro Rata Cost- £${addonProrataCost.proRataCost}`}</p>
            <p>{`Pro Rata Cost With VAT- £${addonProrataCost.proRataCostWithVAT}`}</p>
        </BlockContainer>
    );
};

export default AddOnProrata;
