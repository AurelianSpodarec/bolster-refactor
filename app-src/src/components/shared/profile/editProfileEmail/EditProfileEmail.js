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
import { CONFIRM_SUBMIT, SUCCESS_MODAL } from 'constants/shared/modalTypes';
import { hideModal } from '../../../../actions/shared/generic/modals/sync/hideModal';

const EditProfileEmail = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const { postSuccess, error, shouldShowMergeModal } = useSelector(profileSelector);
    const prevProps = usePrevious({ postSuccess, error, shouldShowMergeModal });
    const [{ email, password }, handleChange] = useForm({ email: '', password: '' });
    const handleSubmit = (confirmMerge = false) => {
        console.log('hello');
        const postBody = { email, password, confirmMerge };
        dispatch(changeProfileEmail(postBody));
    };
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            const message =
                'An email has been sent to the provided address, please follow the instructions in this email to complete the process';
            dispatch(showModal(SUCCESS_MODAL, { message }));
            history.push(location.pathname.replace('/change-email', ''));
        }
    }, [postSuccess, prevProps.postSuccess, dispatch, history, location.pathname]);

    useEffect(() => {
        if (shouldShowMergeModal && !prevProps.shouldShowMergeModal) {
            const mergeMessage = `That email address is already in use. You can still change your email to this address, and this account will be merged with the existing user with email address: ${email}`;
            dispatch(
                showModal(CONFIRM_SUBMIT, {
                    title: 'Merge users',
                    message: mergeMessage,
                    handleSubmit: () => handleSubmit(true),
                    hideModal: () => dispatch(hideModal()),
                    submitButtonText: 'Confirm',
                }),
            );
        }
    }, [shouldShowMergeModal, prevProps.shouldShowMergeModal, dispatch]);
    return (
        <>
            <PageHeading leftChildren={true} title="Change Email">
                <BackButtonContainer />
            </PageHeading>

            <BlockContainer>
                <Form onSubmit={() => handleSubmit(false)}>
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
        profileReducer: { postSuccess, error, shouldShowMergeModal },
    },
}) => ({ postSuccess, error, shouldShowMergeModal });

export default EditProfileEmail;
