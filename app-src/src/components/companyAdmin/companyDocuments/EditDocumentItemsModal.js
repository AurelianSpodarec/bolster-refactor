import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import { useForm, usePrevious, useQueryParam } from 'helpers/hooks';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import editDocumentLibraryItems from 'actions/companyAdmin/documentLibrary/async/editDocumentLibraryItems';
import editDocumentLibraryItem from 'actions/companyAdmin/documentLibrary/async/editDocumentLibraryItem';
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
    const history = useHistory();
    const documentLibrary = useSelector(selectDocumentLibrary);

    const prefix = useQueryParam('prefix');
    const splitArray = prefix.split('/');
    const prevPrefix = splitArray.length > 2 ? prefix.split('/').slice(0, -2).join('/') : null;

    const companyDocuments = useMemo(() => {
        if (ids.length === 1) {
            return documentLibrary[ids[0]];
        } else if (!ids.length) {
            return Object.values(documentLibrary).find(folder => folder.isCurrentFolder);
        } else {
            return documentLibrary;
        }
    }, [documentLibrary, ids]);

    const initialFormData = {
        name: '',
        isAttachPins: false,
        isViewApp: false,
    };

    if (ids.length <= 1) {
        const { name, isAttachPins, isViewApp } = companyDocuments;
        initialFormData.name = name.replaceAll('/', '');
        initialFormData.isAttachPins = isAttachPins;
        initialFormData.isViewApp = isViewApp;
    }

    const [formData, handleChange] = useForm(initialFormData);

    const isPosting = useSelector(selectDocumentLibraryIsPosting);
    const error = useSelector(selectDocumentLibraryPostError);
    const success = useSelector(selectDocumentLibraryPostSuccess);

    const postBody = {
        ...formData,
    };

    const handleSubmit = () => {
        if (ids.length <= 1) {
            const { id, isCurrentFolder } = companyDocuments;
            dispatch(editDocumentLibraryItem(id, postBody, isCurrentFolder));
        } else {
            const body = {
                ids,
                ...postBody,
            };
            dispatch(editDocumentLibraryItems(body));
        }
    };

    const handleCancel = () => {
        dispatch(hideModal());
    };

    const prevSuccess = usePrevious(success);

    useEffect(() => {
        if (!prevSuccess && success) {
            if (companyDocuments.isCurrentFolder) {
                setTimeout(() => {
                    const newPrefix = prevPrefix ? `${prevPrefix}/${formData.name}` : formData.name;

                    history.push(`/company/company-documents?prefix=${newPrefix}/`);
                }, 1000);
            }
            dispatch(showModal(SUCCESS_MODAL, { message: 'Successfully updated library items' }));
        }
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
