import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PARENTAL_TYPES } from 'constants/companyAdmin/enums';
import { BUY_CREDITS } from 'constants/shared/modalTypes';
import PaymentIcon from '../../../../_content/images/icons/paymentIcon.png';

import showModal from 'actions/shared/generic/modals/sync/showModal';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';
import { selectCompanyUsers } from 'selectors/companyAdmin/companyUsers';
import { selectTotalCredits } from 'selectors/companyAdmin/credits';
import { selectJwtData } from 'selectors/shared/jwt';

const CreditsButton = () => {
    const dispatch = useDispatch();

    const { parentalType } = useSelector(selectCompanySettings);
    const companyUsers = useSelector(selectCompanyUsers);
    const { companyUserID } = useSelector(selectJwtData);
    const totalCredits = useSelector(selectTotalCredits);

    const [shouldRestrictPayments, setShouldRestricPayments] = useState(false);

    useEffect(() => {
        if (companyUsers && companyUsers[companyUserID]) {
            setShouldRestricPayments(companyUsers[companyUserID].shouldRestrictPayments);
        }
    }, [companyUsers, companyUserID]);

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
