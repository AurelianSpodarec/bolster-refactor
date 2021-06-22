import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import { useForm, usePrevious } from 'helpers/hooks';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import changeProfileEmail from 'actions/shared/profile/async/changeProfileEmail';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const EditProfileEmail = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { postSuccess, error } = useSelector(profileSelector);
    const prevProps = usePrevious({ postSuccess, error });
    const [{ email, password }, handleChange] = useForm({ email: '', password: '' });
    const handleSubmit = () => {
        const postBody = { email, password };
        dispatch(changeProfileEmail(postBody));
    };
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    message:
                        'An email has been sent to the provided address, please follow the instructions in this email to complete the process',
                }),
            );
            history.push(location.pathname.replace('/change-email', ''));
        }
    }, [postSuccess, error]);
    return (
        <>
            <PageHeading leftChildren={true} title="Change Email">
                <BackButtonContainer />
            </PageHeading>

            <BlockContainer>
                <Form onSubmit={handleSubmit}>
                    <div className="size-lg-6 size-md-12">
                        <Field name="Enter new E-mail address" required>
                            <TextInputContainer
                                value={email}
                                name="email"
                                handleChange={handleChange}
                                type="email"
                                required
                            />
                        </Field>
                        <Field name="Enter current password" required>
                            <TextInputContainer
                                value={password}
                                name="password"
                                handleChange={handleChange}
                                type="password"
                                required
                            />
                        </Field>
                    </div>
                    <BlockButtonWrapper>
                        <button type="submit" className="button green">
                            Confirm
                        </button>
                        <Link
                            to={location.pathname.replace('/change-email', '')}
                            className="button"
                        >
                            Cancel
                        </Link>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

const profileSelector = ({
    shared: {
        profileReducer: { postSuccess, error },
    },
}) => ({ postSuccess, error });

export default EditProfileEmail;
