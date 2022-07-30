import React, { useEffect } from 'react';
import ModalOuterContainer from '../../../shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from '../../../shared/generic/blockHeading/presentational/BlockHeading';
import Form from '../../../shared/generic/form/containers/Form';
import Field from '../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from '../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../../../actions/shared/generic/modals/sync/hideModal';
import { useForm, usePrevious } from '../../../../helpers/hooks';
import {
    selectUsersError,
    selectUsersIsPosting,
    selectUsersPostSuccess,
    selectUsersShouldShowMergeModal,
} from '../../../../selectors/superAdmin/users';
import CheckboxContainer from '../../../shared/generic/form/containers/CheckboxContainer';
import editUserEmail from '../../../../actions/superAdmin/users/async/editUserEmail';

const EditUserEmailModal = ({ user }) => {
    const dispatch = useDispatch();
    const isPosting = useSelector(selectUsersIsPosting);
    const postSuccess = useSelector(selectUsersPostSuccess);
    const error = useSelector(selectUsersError);
    const shouldShowMerge = useSelector(selectUsersShouldShowMergeModal);
    const prevProps = usePrevious({ postSuccess, error, shouldShowMerge });
    const [form, handleChange] = useForm({
        email: '',
        confirmMerge: false,
    });
    const handleSubmit = () => {
        if (isPosting) return;
        // TODO: submit form
        dispatch(editUserEmail(user.id, form));
    };
    useEffect(() => {
        if (postSuccess && !prevProps.postSuccess) {
            // todo replace with success modal
            dispatch(hideModal());
        }
    }, [postSuccess, prevProps.postSuccess, dispatch]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit User Details" />
            <Form className="generic-form" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Email address" required>
                        <TextInputContainer
                            handleChange={handleChange}
                            name="email"
                            value={form.email}
                            type="email"
                            required
                        />
                    </Field>
                </div>
                <div>
                    {shouldShowMerge && (
                        <Field
                            name="Confirm merge"
                            htmlFor="confirmMerge"
                            smallDesc={`This email address is already in use. Changing this user's email address to ${form.email} will merge this user with the existing user. Continue?`}
                        >
                            <CheckboxContainer
                                handleChange={handleChange}
                                name="confirmMerge"
                                checked={form.confirmMerge}
                                required
                            />
                        </Field>
                    )}
                </div>
                <BlockButtonWrapper>
                    <button className="button green" type="submit" disabled={isPosting}>
                        Submit
                    </button>
                    <button className="button" onClick={() => dispatch(hideModal())}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditUserEmailModal;
