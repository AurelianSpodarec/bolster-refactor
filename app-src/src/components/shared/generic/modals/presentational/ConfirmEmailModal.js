import React from 'react';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import ButtonContainer from '../../button/containers/ButtonContainer';
import Form from '../../form/containers/Form';
import ModalOuterContainer from '../containers/ModalOuterContainer';
import { connect, useSelector } from 'react-redux';
import postResendConfirmEmail from 'actions/shared/auth/async/postResendConfirmEmail';

const ConfirmTwoFactorModal = ({ profile, postSuccess, sendConfirmEmail }) => {
    const onSubmit = e => {
        e.preventDefault();
        sendConfirmEmail(profile.email);
    };

    return (
        <ModalOuterContainer hideCloseButton>
            <BlockHeading title="Confirm" />
            <Form onSubmit={onSubmit}>
                <p>
                    Your email address is unconfirmed. Please confirm your email address to
                    continue.
                </p>

                <BlockButtonWrapper>
                    <ButtonContainer type="submit">
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
}) => ({ profile, postSuccess });
const mapDispatchToProps = dispatch => ({
    sendConfirmEmail: email => dispatch(postResendConfirmEmail({ email })),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTwoFactorModal);
