import postSetupTwoFactor from 'actions/shared/auth/async/postSetupTwoFactor';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_TWO_FACTOR_SETUP } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SetupTwoFactor from './SetupTwoFactor';

const SetupTwoFactorContainer = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const { isPosting, postSuccess, error } = useSelector(
        ({
            shared: {
                profileReducer: { isPosting, postSuccess, error },
            },
        }) => ({ isPosting, postSuccess, error }),
    );

    const prevProps = usePrevious({ isPosting, postSuccess, error });

    const handleSubmit = e => {
        e.preventDefault();
        // validate
        // send to api
        dispatch(postSetupTwoFactor({ phoneNumber }));
        // open modal to submit code
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(showModal(CONFIRM_TWO_FACTOR_SETUP, { phoneNumber }));
        }
        if (error && !prevProps.error) {
            // dispatch(showModal(ERROR_MODAL));
        }
    }, [postSuccess, error]);

    return (
        <SetupTwoFactor
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
        />
    );
};

export default SetupTwoFactorContainer;
