import React from 'react';

// ambient options: primary, positive, negative, null
const ButtonWrapperInfo = ({
    text,
    ambient,
    large = false,
    removeSpacing = false,
    disabled = false,
}) => (
    <p
        className={`button-wrapper-info ${ambient} ${large ? 'large' : ''} ${
            disabled ? 'disabled' : ''
        } ${removeSpacing ? 'no-spacing' : ''}`}
    >
        {text}
    </p>
);

export default ButtonWrapperInfo;
