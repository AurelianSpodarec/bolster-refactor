import React from 'react';
import { LABEL_TYPES_NUMS as LABEL_TYPE } from 'constants/companyAdmin/enums';

import StandardLabelImage from '_content/images/labels/standard.png';
import TrimLabelImage from '_content/images/labels/trim.png';

const LabelTypeRadioButton = ({
    name,
    value,
    text,
    checked,
    handleInputChange,
    disabled = false,
    extraDetails = ''
}) => {
    let image = StandardLabelImage;

    if (value + '' === LABEL_TYPE.TRIM + '') {
        image = TrimLabelImage;
    }

    return (
        <div
            className={`radio-button label-example ${
                disabled ? 'grey-out' : ''
            }`}
        >
            <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={checked}
                onChange={() => handleInputChange(name, value)}
                disabled={disabled}
            />
            <div className={'holder'}>
                <label className="text" htmlFor={value}>
                    {text}
                </label>
                <span className="outer">
                    <span className="inner" />
                </span>
            </div>
            <div className="radio-image">
                <img alt="label example" src={image} />
            </div>
            {!!extraDetails.length && (
                <span className="details">
                    <strong>Note: </strong>
                    {extraDetails}
                </span>
            )}
        </div>
    );
};

export default LabelTypeRadioButton;
