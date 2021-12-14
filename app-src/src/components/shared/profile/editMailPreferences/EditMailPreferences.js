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
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const EditMailPreferences = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { postSuccess, error } = useSelector(profileSelector);
    const prevProps = usePrevious({ postSuccess, error });
    const [{ alertMessages, drawingExpirations }, handleChange] = useForm({
        alertMessages: true,
        drawingExpirations: true,
    });
    const handleSubmit = () => {
        const postBody = { alertMessages, drawingExpirations };
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
            <PageHeading leftChildren={true} title="Edit Mail Preferences">
                <BackButtonContainer />
            </PageHeading>

            <BlockContainer heading="Your Mail Preferences">
                <Form onSubmit={handleSubmit}>
                    <p style={{ marginBottom: '24px' }}>
                        Please check which alert types you would like to recieve emails for.
                    </p>
                    <div className="size-lg-6 size-md-12">
                        <div className="" style={{ display: 'flex' }}>
                            <Field name="Alert Messages">
                                <CheckboxContainer
                                    checked={alertMessages}
                                    name="alertMessages"
                                    handleChange={handleChange}
                                />
                            </Field>
                            <Field name="Drawing Expirations">
                                <CheckboxContainer
                                    checked={drawingExpirations}
                                    name="drawingExpirations"
                                    handleChange={handleChange}
                                />
                            </Field>
                        </div>
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

export default EditMailPreferences;
