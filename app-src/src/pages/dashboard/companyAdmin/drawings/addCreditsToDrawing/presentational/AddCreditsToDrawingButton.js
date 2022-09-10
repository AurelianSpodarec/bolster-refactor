import React from 'react';

import ActionMenuActionButton from 'components_DEPRECATED/shared/actionMenu/ActionMenuActionButton';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const AddCreditsToDrawingButton = ({ handleClick, isExpired }) =>
    isExpired ? (
        <ActionButton text="Add credits" onClick={handleClick} ambient="positive" icon="plus" />
    ) : (
        <ActionMenuActionButton text="Add credits" onClick={handleClick} />
    );

export default AddCreditsToDrawingButton;
