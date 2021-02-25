import postConfirmSetupTwoFactor from 'actions/shared/twoFactor/postConfirmSetupTwoFactor';
import postSetupTwoFactor from 'actions/shared/twoFactor/postSetupTwoFactor';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { CONFIRM_TWO_FACTOR, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SetupTwoFactor from './SetupTwoFactor';

const SetupTwoFactorContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isModalShowing, setShowModal] = useState(false);
    const { isPosting, postSuccess, error } = useSelector(
        ({
            shared: {
                twoFactorReducer: { isPosting, postSuccess, error },
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
                }),
            );
            setShowModal(true);
        }
        if (error && !prevProps.error) {
            // dispatch(showModal(ERROR_MODAL));
        }
    }, [postSuccess, error]);

    if (postSuccess && !prevProps.postSuccess && isModalShowing) {
        // handle success
        setShowModal(false);
        dispatch(showModal(SUCCESS_MODAL, { message: 'Successfully enabled two factor auth.' }));

        history.push(location.pathname.replace('twofactor/setup', ''));
    }

    return (
        <SetupTwoFactor
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            handleSubmit={handleSubmit}
        />
    );
};

export default SetupTwoFactorContainer;
