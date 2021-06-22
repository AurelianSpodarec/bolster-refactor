import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import postConfirmDisableTwoFactor from 'actions/shared/twoFactor/postConfirmDisableTwoFactor';
import postDisableTwoFactor from 'actions/shared/twoFactor/postDisableTwoFactor';
import { CONFIRM_SUBMIT, CONFIRM_TWO_FACTOR } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import ProfileDetails from '../presentational/ProfileDetails';

const ProfileDetailsContainer = ({
    error,
    isFetching,
    profile,
    onMobile,
    isPostingConfirm,
    postConfirmSuccess,
}) => {
    const dispatch = useDispatch();
    const handleDisableTwoFactorConfirmation = () => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                title: 'Disable Two Factor?',
                message: `If your company is configured to require 2fa to
                remain enabled, you will be logged out and unable 
                to log back into this company again until you re-enable it`,
                submitButtonText: 'Confirm',
                handleSubmit: handleDisableTwoFactorFinalCode,
            }),
        );
    };

    const handleDisableTwoFactorFinalCode = () => {
        // generate code
        dispatch(postDisableTwoFactor());
        // show modal for code entry
        dispatch(
            showModal(CONFIRM_TWO_FACTOR, {
                handleSubmit: handleSubmitFinalTwoFactor,
                phoneNumber: profile.twoFactorPhoneNumber,
                email: profile.email,
            }),
        );
    };

    const handleSubmitFinalTwoFactor = code => {
        dispatch(postConfirmDisableTwoFactor({ code }));
    };

    const prevProps = usePrevious({ isPostingConfirm, postConfirmSuccess });
    useEffect(() => {
        if (postConfirmSuccess && !prevProps.postConfirmSuccess) {
            dispatch(hideModal());
        }
    }, [postConfirmSuccess]);

    return (
        <ProfileDetails
            error={error}
            isFetching={isFetching}
            profile={profile}
            onMobile={onMobile}
            handleDisableTwoFactor={handleDisableTwoFactorConfirmation}
        />
    );
};

const mapStateToProps = ({
    shared: {
        profileReducer: { error, isFetching, profile },
        mobileReducer: { onMobile },
        twoFactorReducer: { postConfirmSuccess, isPostingConfirm },
    },
}) => ({
    profile: profile || null,
    error,
    onMobile,
    isFetching,
    isPostingConfirm,
    postConfirmSuccess,
});

export default connect(mapStateToProps)(ProfileDetailsContainer);
