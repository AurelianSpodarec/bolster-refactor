import React from 'react';

import ActionButton from '../generic/button/presentational/ActionButton';

const ActionMenuActionButton = ({ text = '', onClick = () => {}, isNegative = false }) => (
    <ActionButton
        text={text}
        onClick={e => {
            e.preventDefault();
            onClick();
        }}
        source="secondary"
        ambient={isNegative ? 'negative' : 'primary'}
        size="small"
    />
);

export default ActionMenuActionButton;
