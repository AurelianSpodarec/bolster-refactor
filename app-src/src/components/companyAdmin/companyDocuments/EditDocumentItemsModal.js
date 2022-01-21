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
import {
    selectDocumentLibrary,
    selectDocumentLibraryIsPosting,
    selectDocumentLibraryPostError,
    selectDocumentLibraryPostSuccess,
} from 'selectors/documentLibrary';

const EditDocumentItemsModal = ({ ids }) => {
    const dispatch = useDispatch();
    const documentLibrary = useSelector(selectDocumentLibrary);

    const initialFormData = {
        isAttachPins: false,
        isViewApp: false,
    };

    if (ids.length === 1) {
        const { name } = documentLibrary[ids[0]];
        initialFormData.name = name.replaceAll('/', '');
    }

    const [formData, handleChange] = useForm(initialFormData);

    const isPosting = useSelector(selectDocumentLibraryIsPosting);
    const error = useSelector(selectDocumentLibraryPostError);
    const success = useSelector(selectDocumentLibraryPostSuccess);

    const postBody = {
        ...formData,
    };

    const handleSubmit = () => {
        if (ids.length === 1) {
            dispatch(editDocumentLibraryItemName(ids[0], postBody));
        } else {
            const body = {
                ids,
                ...postBody,
            };
            dispatch(editDocumentLibraryFolder(body));
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
                            handleChange={handleChange}
                            value={formData.name}
                            placeholder="Enter new name"
                        />
                    </Field>
                )}
                <Field classes="full-length">
                    <p>Document Use:</p>
                    <div className="checkbox-items">
                        <CheckboxContainer
                            name="isViewApp"
                            checked={formData.isViewApp}
                            text="View in app"
                            handleChange={handleChange}
                        />
                        <CheckboxContainer
                            name="isAttachPins"
                            checked={formData.isAttachPins}
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

export default EditDocumentItemsModal;
