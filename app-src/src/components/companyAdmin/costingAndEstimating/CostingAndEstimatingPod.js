import React, { useState } from 'react';

import BlockContainer from '../../shared/generic/block/containers/BlockContainer';
import FlexWrapper from '../../shared/generic/flexWrapper/FlexWrapper';

import employeeIcon from '_content/images/icons/person_icon.png';
import buildingIcon from '_content/images/icons/building_icon.png';
import poundIcon from '_content/images/icons/pound_icon.png';
import plusIcon from '_content/images/icons/plus_icon.png';

const icons = {
    person: employeeIcon,
    building: buildingIcon,
    pound: poundIcon,
    plus: plusIcon,
};

const CostingAndEstimatingPod = ({ pod }) => {
    const { icon, highest, lowest, solo } = pod;

    const [isFlipped, setIsFlipped] = useState(false);

    const dataToShow = solo ? solo : isFlipped ? lowest : highest;

    return (
        <BlockContainer
            contentClass={`background-gradient ${isFlipped ? 'flipped' : ''} border cursor-pointer`}
        >
            <FlexWrapper extraClasses="icon-wrapper" justify="between" align="center">
                <div className="icon">
                    <img src={icons[icon] || plusIcon} alt={icon} />
                </div>
                {!solo && (
                    <div className="arrow-container">
                        <i
                            className={`fas fa-arrow-${isFlipped ? 'down' : 'up'} ${
                                isFlipped ? 'desc' : 'asc'
                            }`}
                        />
                    </div>
                )}
            </FlexWrapper>

            <h3 className="heading heading-3">{dataToShow.title}</h3>

            <div className="content-wrapper">
                <span>{dataToShow.subtitle}</span>
                <p>{`${dataToShow.valueCurrency || '£'}${dataToShow.valueNumerical}`}</p>
            </div>
        </BlockContainer>
    );
};

export default CostingAndEstimatingPod;
