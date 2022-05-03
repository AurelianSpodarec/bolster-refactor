import React, { useState } from 'react';

import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';

import employeeIcon from '_content/images/icons/person_icon.png';
import buildingIcon from '_content/images/icons/building_icon.png';
import poundIcon from '_content/images/icons/pound_icon.png';
import plusIcon from '_content/images/icons/plus_icon.png';
import { formatCurrency } from 'helpers/generic';

const icons = {
    person: employeeIcon,
    building: buildingIcon,
    pound: poundIcon,
    plus: plusIcon,
};

const CostingAndEstimatingPod = ({ pod }) => {
    const { icon, highest, lowest, solo } = pod;

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        if (solo) return;
        setIsFlipped(!isFlipped);
    };

    const dataToShow = solo ? solo : isFlipped ? lowest : highest;
    const valueIsCurrency = dataToShow?.valueCurrency !== null;

    return (
        <BlockContainer
            contentClass={`background-gradient border ${!solo ? 'cursor-pointer' : ''}`}
            onClick={handleFlip}
        >
            <div className={`pod-flip-bg background-gradient ${isFlipped ? 'flipped' : ''}`} />
            <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                <div className="icon">
                    <img src={icons[icon] || plusIcon} alt={icon} />
                </div>
                {!solo && (
                    <div className="arrow-container">
                        <i className={`fas fa-arrow-up ${isFlipped ? 'desc' : 'asc'}`} />
                    </div>
                )}
            </FlexWrapper>
            <h3 className="heading heading-3">{dataToShow.title}</h3>
            <div className="spacer" />

            <div className="content-wrapper">
                <span>{dataToShow.subtitle}</span>
                <p>{`${
                    valueIsCurrency
                        ? `£${
                              !Number.isNaN(dataToShow.valueNumerical)
                                  ? formatCurrency(dataToShow.valueNumerical)
                                  : ''
                          }`
                        : dataToShow.valueNumerical
                }`}</p>
            </div>
        </BlockContainer>
    );
};

export default CostingAndEstimatingPod;
