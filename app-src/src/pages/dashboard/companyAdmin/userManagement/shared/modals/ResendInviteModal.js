import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import { ERROR_MODAL, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import resendCompanyUserInvite from 'actions/companyAdmin/userManagement/async/resendCompanyUserInvite';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';

const ResendInviteModal = ({ user: { id, userFirstName, userLastName } }) => {
    const dispatch = useDispatch();
    const { isPosting, postError, postSuccess } = useSelector(mapStateToProps);
    const prevProps = usePrevious({ postSuccess, postError });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, { message: 'The invite has successfully been resent!' }),
            );
        }

        if (postError && !prevProps.postError) {
            dispatch(showModal(ERROR_MODAL, { message: postError }));
        }
    }, [dispatch, postSuccess, prevProps.postSuccess, postError, prevProps.postError]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Resend Invite" />
            <Form onSubmit={handleSubmit}>
                <p>
                    Are you sure you would like to resend the invite for{' '}
                    {`${userFirstName} ${userLastName}`}?
                </p>
                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            size="small"
                            source="secondary"
                            onClick={() => dispatch(hideModal())}
                        />
                        <ActionButton
                            type="submit"
                            text="Confirm"
                            size="small"
                            icon={isPosting ? 'spinner' : 'check'}
                            iconSpin={isPosting}
                            disabled={isPosting}
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );

    function handleSubmit() {
        dispatch(resendCompanyUserInvite(id));
    }
};

const mapStateToProps = ({
    companyAdmin: {
        inactiveCompanyUsersReducer: { isPosting, postError, postSuccess },
    },
}) => ({
    isPosting,
    postError,
    postSuccess,
});

export default ResendInviteModal;
