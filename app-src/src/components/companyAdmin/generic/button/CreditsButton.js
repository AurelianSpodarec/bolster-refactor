import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import PaymentIcon from '../../../../_content/images/icons/paymentIcon.svg';

import useShouldRestrictPayments from 'hooks/useShouldRestrictPayments';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectTotalCredits } from 'selectors/companyAdmin/credits';

const CreditsButton = () => {
    const dispatch = useDispatch();

    const { parentalType } = useSelector(selectCompanySettings);
    const totalCredits = useSelector(selectTotalCredits);

    const shouldRestrictPayments = useShouldRestrictPayments();

    const isParentalTypeNone = parentalType === PARENTAL_TYPES.NONE;

    const handleClick = () => {
        if (!shouldRestrictPayments) dispatch(showModal(BUY_CREDITS));
    };

    const statusClass = shouldRestrictPayments ? '' : totalCredits ? 'positive' : 'negative';

    return (
        <button
            className={`credits-button flex-row align-stretch ${statusClass}`}
            onClick={handleClick}
        >
            {isParentalTypeNone && (
                <div className="balance flex-row align-center justify-center">
                    {shouldRestrictPayments ? '-' : totalCredits}
                </div>
            )}
            <div
                className={`buy flex-row align-center ${
                    !isParentalTypeNone ? 'fully-rounded' : ''
                }`}
            >
                <img alt="bank card" className="icon" src={PaymentIcon} />
                Buy Credits
            </div>
        </button>
    );
};

export default CreditsButton;
