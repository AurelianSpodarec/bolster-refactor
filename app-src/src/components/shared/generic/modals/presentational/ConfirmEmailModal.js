import React from 'react';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import ButtonContainer from '../../button/containers/ButtonContainer';
import Form from '../../form/containers/Form';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import { connect } from 'react-redux';
import postResendConfirmEmail from 'actions/shared/auth/async/postResendConfirmEmail';
import Loading from '../../misc/presentational/Loading';
import { usePrevious } from 'helpers/hooks';

const ConfirmTwoFactorModal = ({ profile, isPosting, postSuccess, sendConfirmEmail }) => {
    const onSubmit = e => {
        e.preventDefault();
        sendConfirmEmail(profile.email);
    };

    const prevProps = usePrevious({ postSuccess, isPosting });

    console.log({ postSuccess, isPosting });
    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title="Confirm" />
            <Form onSubmit={onSubmit}>
                {!postSuccess ? (
                    <p>
                        Your email address is unconfirmed. Please confirm your email address to
                        continue.
                    </p>
                ) : (
                    <p>Confirmation email sent. Please check your inbox.</p>
                )}

                {!!isPosting && <Loading />}

                <BlockButtonWrapper>
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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTwoFactorModal);
