import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import editClientUserEmail from 'actions/companyAdmin/clients/async/editClientUserEmail';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BackButtonContainer from 'components_DEPRECATED/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components_DEPRECATED/shared/generic/block/containers/BlockContainer';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import Error from 'components_DEPRECATED/shared/generic/misc/presentational/Error';
import PageHeading from 'components_DEPRECATED/shared/generic/pageHeading/presentational/PageHeading';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { usePrevious } from 'helpers/hooks';
import BlockButtonWrapper from 'components_DEPRECATED/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const EditClientUserEmail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const { postSuccess, error } = useSelector(formStateSelector);
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
                        <ButtonWrapper alignment="right">
                            <ActionButton
                                onClick={() => history.goBack()}
                                text="Cancel"
                                source="secondary"
                            />
                            <ActionButton type="submit" text="Confirm" icon="check" />
                        </ButtonWrapper>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

const formStateSelector = ({
    companyAdmin: {
        clientsReducer: { postSuccess, error },
    },
}) => ({ postSuccess, error });

export default EditClientUserEmail;
