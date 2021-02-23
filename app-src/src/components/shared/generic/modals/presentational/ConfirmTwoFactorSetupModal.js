import postConfirmSetupTwoFactor from 'actions/shared/auth/async/postConfirmSetupTwoFactor';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import BlockButtonWrapper from '../../blockButtonWrappers/presentational/BlockButtonWrapper';
import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import ButtonContainer from '../../button/containers/ButtonContainer';
import Form from '../../form/containers/Form';
import TextInputContainer from '../../form/containers/TextInputContainer';
import Field from '../../form/presentational/Field';
import ModalOuterContainer from '../containers/ModalOuterContainer';

const ConfirmTwoFactorSetupModal = ({ phoneNumber }) => {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { isPosting, error, postSuccess } = useSelector(selector);
    const history = useHistory();
    const location = useLocation();
    const prevProps = usePrevious({ isPosting, error, postSuccess });
    const dispatch = useDispatch();
    const handleSubmit = e => {
        // validate?
        e.preventDefault();
        dispatch(postConfirmSetupTwoFactor({ code }));
    };

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            // handle success
            dispatch(
                showModal(SUCCESS_MODAL, { message: 'Successfully enabled two factor auth.' }),
            );
            history.push(location.pathname.replace('twofactor/setup', ''));
        }
        if (error && !prevProps.error) {
            setErrorMessage('Invalid code. Please try again.');
        }
    }, [isPosting, error, postSuccess]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Confirm" />
            <Form onSubmit={handleSubmit}>
                <p>We have sent a code via SMS to {phoneNumber}. Please enter the code below.</p>
                <Field>
                    <TextInputContainer
                        value={code}
                        name="code"
                        handleChange={(_, value) => setCode(value)}
                    />
                </Field>
                <BlockButtonWrapper>
                    <ButtonContainer type="submit">Submit</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};
export default ConfirmTwoFactorSetupModal;

const selector = ({
    shared: {
        profileReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });
