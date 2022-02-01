import React from 'react';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import ButtonContainer from '../../button/containers/ButtonContainer';
import Form from '../../form/containers/Form';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import { connect, useDispatch } from 'react-redux';
import postResendConfirmEmail from 'actions/shared/auth/async/postResendConfirmEmail';
import Loading from '../../misc/presentational/Loading';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const ConfirmEmailModal = ({
    showDismiss = true,
    profile,
    isPosting,
    postSuccess,
    sendConfirmEmail,
}) => {
    const dispatch = useDispatch();
    const onSubmit = e => {
        e.preventDefault();
        sendConfirmEmail(profile.email);
    };

    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title="Confirm" />
            <Form onSubmit={onSubmit}>
                {!postSuccess ? (
                    <p>
                        Your email address is unconfirmed. Please click here and follow the steps on
                        the email you will receive to complete this process. If your email address
                        is incorrect, invalid or old, please update through My Profile.
                    </p>
                ) : (
                    <p>Confirmation email sent. Please check your inbox.</p>
                )}

                {!!isPosting && <Loading />}

                <BlockButtonWrapper>
                    {showDismiss && (
                        <ButtonContainer type="submit" handleClick={() => dispatch(hideModal())}>
                            Dismiss
                        </ButtonContainer>
                    )}
                    <ButtonContainer type="submit" handleClick={onSubmit}>
                        {postSuccess ? 'Resend' : 'Send'} Email
                    </ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

const mapStateToProps = ({
    shared: {
        profileReducer: { profile, postSuccess },
    },
    frontEnd: {
        authReducer: { isPosting },
    },
}) => ({ profile, postSuccess, isPosting });
const mapDispatchToProps = dispatch => ({
    sendConfirmEmail: email => {
        return dispatch(postResendConfirmEmail({ email }));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailModal);
