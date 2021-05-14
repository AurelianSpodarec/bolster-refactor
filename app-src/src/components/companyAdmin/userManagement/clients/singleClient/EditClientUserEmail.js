import editClientUserEmail from 'actions/companyAdmin/clients/async/editClientUserEmail';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import Error from 'components/shared/generic/misc/presentational/Error';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const EditClientUserEmail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const { postSuccess, error, isPosting } = useSelector(formStateSelector);
    const prevProps = usePrevious({ postSuccess, error });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            const successMsg =
                'This user will receive an email to their new email address to confirm this change, after which they will be able to log in with the new address.';
            dispatch(showModal(SUCCESS_MODAL, { title: 'Success!', message: successMsg }));
            history.goBack();
        }
    }, [postSuccess, error, prevProps]);

    const handleSubmit = () => {
        if (isPosting) return;
        dispatch(editClientUserEmail(id, { email }));
    };
    return (
        <>
            <PageHeading leftChildren={true} title="Edit Client's Email">
                <BackButtonContainer />
            </PageHeading>
            <BlockContainer>
                <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                    <div className="size-lg-12">
                        <div className="size-lg-6">
                            <Field name="New Email" required>
                                <TextInputContainer
                                    name="email"
                                    type="email"
                                    value={email}
                                    handleChange={(_, email) => setEmail(email)}
                                    required
                                />
                            </Field>
                            {error && <Error>{error}</Error>}
                        </div>
                    </div>

                    <BlockButtonWrapper>
                        <button type="submit" className="button green">
                            Confirm
                        </button>
                        <ButtonContainer onClick={() => history.goBack()}>Cancel</ButtonContainer>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

const formStateSelector = ({
    companyAdmin: {
        clientsReducer: { isPosting, postSuccess, error },
    },
}) => ({ isPosting, postSuccess, error });

export default EditClientUserEmail;
