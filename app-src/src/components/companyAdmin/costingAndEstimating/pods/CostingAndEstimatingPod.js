import React, { useState } from 'react';

import BlockContainer from '../../../shared/generic/block/containers/BlockContainer';
import FlexWrapper from '../../../shared/generic/flexWrapper/FlexWrapper';

import employeeIcon from 'assets/images/icons/person_icon.png';
import buildingIcon from 'assets/images/icons/building_icon.png';
import poundIcon from 'assets/images/icons/pound_icon.png';
import plusIcon from 'assets/images/icons/plus_icon.png';
import { formatCurrency } from 'helpers/generic';
import { useSelector } from 'react-redux';
import { selectCompanyCurrency } from '../../../../selectors/companyAdmin/companySettings';
import { CURRENCY_SYMBOLS } from '../../../../constants/companyAdmin/enums';

const icons = {
    Person: employeeIcon,
    Building: buildingIcon,
    Money: poundIcon,
    Plus: plusIcon,
};

const CostingAndEstimatingPod = ({ pod }) => {
    const { icon, highest, lowest, solo } = pod;

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        if (solo) return;
        setIsFlipped(prev => !prev);
    };

    const value = solo ? solo : isFlipped ? lowest : highest;
    const valueIsCurrency = value?.valueCurrency !== null;
    let dataToShow = value.valueNumerical ?? '';
    const reportingCurrency = useSelector(selectCompanyCurrency);
    if (valueIsCurrency) {
        // handle negative
        if (value.valueCurrency < 0) dataToShow = '-';
        const currencySymbol = CURRENCY_SYMBOLS[reportingCurrency];
        dataToShow += currencySymbol;
        // handle missing value
        if (Number.isNaN(value.valueCurrency)) dataToShow += '0.00';
        // convert currency value to positive number so negative sign is not re-added (handled above)
        else dataToShow += formatCurrency(value.valueCurrency, false);
    }

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
                    <div className={`arrow-container ${isFlipped ? 'desc' : 'asc'}`}>
                        <i className={'fas fa-arrow-up'} />
                    </div>
                )}
            </FlexWrapper>
            <h3 className="heading heading-3">{value.title}</h3>
            <div className="spacer" />

            <div className="content-wrapper">
                <span>{value.subtitle}</span>
                <p>{dataToShow}</p>
            </div>
        </BlockContainer>
    );
};

export default CostingAndEstimatingPod;
