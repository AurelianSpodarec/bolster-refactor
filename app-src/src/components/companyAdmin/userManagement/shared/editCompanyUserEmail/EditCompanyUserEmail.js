import editCompanyUserEmail from 'actions/companyAdmin/userManagement/async/editCompanyUserEmail';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
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
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';

const EditCompanyUserEmail = () => {
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
        dispatch(editCompanyUserEmail(id, { email }));
    };
    return (
        <>
            <PageHeading leftChildren={true} title="Edit User's Email">
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

                    <div className="size-lg-12">
                        <ButtonWrapper alignment="right">
                            <ActionButton
                                text="Cancel"
                                onClick={() => history.goBack()}
                                size="small"
                                source="secondary"
                            />
                            <ActionButton type="submit" text="Confirm" icon="check" size="small" />
                        </ButtonWrapper>
                    </div>
                </Form>
            </BlockContainer>
        </>
    );
};

const formStateSelector = ({
    companyAdmin: {
        companyUsersReducer: { postSuccess, error },
    },
}) => ({ postSuccess, error });

export default EditCompanyUserEmail;
