import React from 'react';

import LinkButton from '../generic/button/presentational/LinkButton';

const ActionMenuLinkButton = ({ text = '', href = '', isNegative = false, disabled = false }) => (
    <LinkButton
        text={text}
        href={href}
        source="secondary"
        ambient={isNegative ? 'negative' : 'primary'}
        size="small"
        disabled={disabled}
    />
);

export default ActionMenuLinkButton;
