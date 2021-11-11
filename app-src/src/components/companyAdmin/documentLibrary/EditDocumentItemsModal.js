import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import { useForm, usePrevious } from 'helpers/hooks';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import editDocumentLibraryFolder from 'actions/companyAdmin/documentLibrary/async/editDocumentLibraryFolder';
import editDocumentLibraryItemName from 'actions/companyAdmin/documentLibrary/async/editDocumentLibraryItemName';
import showModal from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL } from 'constants/shared/modalTypes';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';

const EditDocumentItemsModal = ({ ids }) => {
    const dispatch = useDispatch();
    const [{ isAttachPins, isViewApp }, handleChange] = useForm({
        isAttachPins: false,
        isViewApp: false,
    });
    const [{ name }, handleNameChange] = useForm({ name: '' });

    const isPosting = useSelector(selectIsPosting);
    const error = useSelector(selectError);
    const success = useSelector(selectIsSuccess);

    const handleSubmit = () => {
        const postBody = {
            isAttachPins,
            isViewApp,
            ids,
        };

        if (ids.length <= 1 && name.length) {
            dispatch(editDocumentLibraryItemName({ id: ids[0], name })).then(response => {
                if (response.type === 'EDIT_DOCUMENT_LIBRARY_ITEM_NAME_SUCCESS') {
                    dispatch(editDocumentLibraryFolder(postBody));
                }
            });
        } else {
            dispatch(editDocumentLibraryFolder(postBody));
        }
    };

    const handleCancel = () => {
        dispatch(hideModal());
    };

    const prevSuccess = usePrevious(success);

    useEffect(() => {
        if (!prevSuccess && success)
            dispatch(showModal(SUCCESS_MODAL, { message: 'Successfully updated library items' }));
    }, [success, prevSuccess]);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit items" />
            <Form onSubmit={handleSubmit}>
                {ids.length <= 1 && (
                    <Field name="Change Folder/File Name" classes="full-length">
                        <TextInputContainer
                            name="name"
                            handleChange={handleNameChange}
                            value={name}
                            placeholder="Enter new name"
                        />
                    </Field>
                )}
                <Field classes="full-length">
                    <p>Document Use:</p>
                    <div className="checkbox-items">
                        <CheckboxContainer
                            name="isViewApp"
                            checked={isViewApp}
                            text="View in app"
                            handleChange={handleChange}
                        />
                        <CheckboxContainer
                            name="isAttachPins"
                            checked={isAttachPins}
                            text="Attach to pins"
                            handleChange={handleChange}
                        />
                    </div>
                    <p>(if none selected, document is only viewable on desktop)</p>
                </Field>
                <BlockButtonWrapper>
                    <button
                        onClick={handleSubmit}
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        type={isPosting ? 'button' : 'submit'}
                        disabled={isPosting}
                    >
                        {isPosting ? <LoadingIcon /> : 'Submit'}
                    </button>
                    <ButtonContainer handleClick={handleCancel}>Cancel</ButtonContainer>
                </BlockButtonWrapper>
                {!!error && <p className="error">{error}</p>}
            </Form>
        </ModalOuterContainer>
    );
};

const selectIsPosting = state => state.companyAdmin.documentLibraryReducer.isPosting;
const selectError = state => state.companyAdmin.documentLibraryReducer.postError;
const selectIsSuccess = state => state.companyAdmin.documentLibraryReducer.postSuccess;

export default EditDocumentItemsModal;
