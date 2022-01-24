import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm, usePrevious } from 'helpers/hooks';
import { useSelector, useDispatch } from 'react-redux';

import changeProfileEmail from 'actions/shared/profile/async/changeProfileEmail';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import BackButtonContainer from 'components/shared/generic/backButton/containers/BackButtonContainer';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import PageHeading from 'components/shared/generic/pageHeading/presentational/PageHeading';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

import { SUCCESS_MODAL } from 'constants/shared/modalTypes';

const EditMailPreferences = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const {
        profile: { areAlertMessageEmailsEnabled, areDrawingExpirationEmailsEnabled },
        postSuccess,
        error,
    } = useSelector(profileSelector);

    const prevProps = usePrevious({ postSuccess, error });
    const [{ alertMessages, drawingExpirations }, handleChange] = useForm({
        alertMessages: areAlertMessageEmailsEnabled,
        drawingExpirations: areDrawingExpirationEmailsEnabled,
    });

    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            dispatch(
                showModal(SUCCESS_MODAL, {
                    message: 'Successfully changed mail preferences.',
                }),
            );
            history.push(location.pathname.replace('/change-email', ''));
        }
    }, [postSuccess, error]);

    const handleSubmit = () => {
        const postBody = {
            areAlertMessageEmailsEnabled: alertMessages,
            areDrawingExpirationEmailsEnabled: drawingExpirations,
        };
        dispatch(changeProfileEmail(postBody));
    };

    return (
        <>
            <PageHeading leftChildren={true} title="Edit Mail Preferences">
                <BackButtonContainer
                    backFromForm={{
                        urlToReplace: '/company/profile/mailPreferences',
                        with: '/company/profile',
                    }}
                />
            </PageHeading>

            <BlockContainer heading="Your Mail Preferences">
                <Form onSubmit={handleSubmit}>
                    <p style={{ marginBottom: '24px' }}>
                        Please check which alert types you would like to receive emails for.
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
                            Save
                        </button>
                    </BlockButtonWrapper>
                </Form>
            </BlockContainer>
        </>
    );
};

const profileSelector = ({
    shared: {
        profileReducer: { profile, postSuccess, error },
    },
}) => ({ profile, postSuccess, error });

export default EditMailPreferences;
