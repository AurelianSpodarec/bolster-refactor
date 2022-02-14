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
                    <button
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        disabled={isPosting}
                    >
                        {isPosting && <i className="fa fa-spinner fa-spin"></i>}
                        Confirm
                    </button>
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
