import React from 'react';

import ActionButton from '../generic/button/presentational/ActionButton';

const ActionMenuActionButton = ({
    text = '',
    onClick = () => {},
    isNegative = false,
    disabled = false,
    tooltip,
}) => {
    return (
        <ActionButton
            text={text}
            onClick={e => {
                e.preventDefault();
                onClick();
            }}
            source="secondary"
            ambient={isNegative ? 'negative' : 'primary'}
            size="small"
            disabled={disabled}
            tooltip={tooltip}
        />
    );
};

export default ActionMenuActionButton;
