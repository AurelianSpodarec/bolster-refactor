import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import PaymentIcon from '../../../../_content/images/icons/paymentIcon.png';

import useShouldRestrictPayments from 'hooks/useShouldRestrictPayments';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectTotalCredits } from 'selectors/companyAdmin/credits';

const CreditsButton = () => {
    const dispatch = useDispatch();

    const { parentalType } = useSelector(selectCompanySettings);
    const totalCredits = useSelector(selectTotalCredits);

    const shouldRestrictPayments = useShouldRestrictPayments();

    return (
        <button
            className={`credits-button flex-row align-stretch ${
                totalCredits ? 'positive' : 'negative'
            }`}
            onClick={() => dispatch(showModal(BUY_CREDITS))}
        >
            {parentalType === PARENTAL_TYPES.NONE && (
                <div className="balance flex-row align-center justify-center">
                    {shouldRestrictPayments ? '-' : totalCredits}
                </div>
            )}
            <div className="buy flex-row align-center">
                <img alt="bank card" className="icon" src={PaymentIcon} />
                Buy Credits
            </div>
        </button>
    );
};

export default CreditsButton;
