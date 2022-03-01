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
        <div className="credit-container">
            {parentalType === PARENTAL_TYPES.NONE && (
                <div
                    className={`${
                        shouldRestrictPayments
                            ? 'balance'
                            : totalCredits > 0
                            ? 'balance positive-balance'
                            : 'balance negative-balance'
                    }`}
                >
                    {shouldRestrictPayments
                        ? '-'
                        : totalCredits > 999999
                        ? '<999999'
                        : totalCredits}
                </div>
            )}
            <div
                onClick={() => dispatch(showModal(BUY_CREDITS))}
                className={`${
                    shouldRestrictPayments
                        ? 'credit-btn'
                        : totalCredits > 0
                        ? 'credit-btn positive-balance'
                        : 'credit-btn negative-balance'
                }`}
            >
                <img alt="bank card" className="tools-icon" src={PaymentIcon} />
                Buy Credits
            </div>
        </div>
    );
};

export default CreditsButton;
