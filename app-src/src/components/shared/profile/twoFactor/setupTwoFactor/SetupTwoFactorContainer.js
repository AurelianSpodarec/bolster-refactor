import postConfirmSetupTwoFactor from 'actions/shared/twoFactor/postConfirmSetupTwoFactor';
import postSetupTwoFactor from 'actions/shared/twoFactor/postSetupTwoFactor';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_TWO_FACTOR, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SetupTwoFactor from './SetupTwoFactor';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const SetupTwoFactorContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalShowing, setShowModal] = useState(false);
    const { isPosting, postSuccess, error, profile, availableCompanies } = useSelector(
        ({
            companyAdmin: {
                companySelectionReducer: { availableCompanies },
            },
            shared: {
                twoFactorReducer: { isPosting, postSuccess, error },
                profileReducer: { profile },
            },
        }) => ({ isPosting, postSuccess, error, profile, availableCompanies }),
    );

    const prevProps = usePrevious({ isPosting, postSuccess, error });

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(postSetupTwoFactor({ phoneNumber }));
        // open modal to submit code
    };

    const handleSubmitConfirmation = code => {
        // validate?
        dispatch(postConfirmSetupTwoFactor({ code }));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess && !isModalShowing) {
            dispatch(
                showModal(CONFIRM_TWO_FACTOR, {
                    phoneNumber,
                    handleSubmit: handleSubmitConfirmation,
                    email: profile.email,
                }),
            );
            setShowModal(true);
        }
        if (postSuccess && !prevProps.postSuccess && isModalShowing) {
            // handle success
            dispatch(
                showModal(SUCCESS_MODAL, {
                    message: 'You have now successfully set up two factor authentication.',
                }),
            );
            const shouldRedirect = Object.values(availableCompanies).length > 1;
            if (shouldRedirect) {
                history.push('/company/company-selection');
                dispatch(hideModal());
            } else {
                history.push(location.pathname.replace('twofactor/setup', ''));
                dispatch(hideModal());
            }
        }
    }, [postSuccess, error, profile]);

    return (
        <SetupTwoFactor
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
        />
    );
};

export default SetupTwoFactorContainer;
