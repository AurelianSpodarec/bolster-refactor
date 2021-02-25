import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { postDisableTwoFactorRequest } from 'actions/shared/twoFactor/postDisableTwoFactor';
import { CONFIRM_SUBMIT, CONFIRM_TWO_FACTOR } from 'constants/shared/modalTypes';
import React from 'react';
import { connect, useDispatch } from 'react-redux';

import ProfileDetails from '../presentational/ProfileDetails';

const ProfileDetailsContainer = ({ error, isFetching, profile, onMobile }) => {
    const dispatch = useDispatch();
    const handleDisableTwoFactorConfirmation = () => {
        dispatch(
            showModal(CONFIRM_SUBMIT, {
                title: 'Disable Two Factor?',
                message: `Are you sure you wish to disable two factor authentication?
                    This action will require you to enter a final code 
                    from the two factor phone number on your account.`,
                submitButtonText: 'Confirm',
                handleSubmit: handleDisableTwoFactorFinalCode,
            }),
        );
    };

    const handleDisableTwoFactorFinalCode = () => {
        // generate code
        dispatch(postDisableTwoFactorRequest());
        // show modal for code entry
        dispatch(
            showModal(CONFIRM_TWO_FACTOR, {
                handleSubmit: () => {},
                phoneNumber: profile.phoneNumber,
            }),
        );
    };

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
    },
}) => ({
    profile: profile || null,
    error,
    onMobile,
    isFetching,
});

export default connect(mapStateToProps)(ProfileDetailsContainer);
