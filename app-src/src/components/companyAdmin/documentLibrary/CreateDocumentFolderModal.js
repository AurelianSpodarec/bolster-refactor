import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { useForm, usePrevious, useQueryParam } from 'helpers/hooks';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import createDocumentLibraryFolder from 'actions/companyAdmin/documentLibrary/async/fetchDocumentLibraryFilesForCompany';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import Error from 'components/shared/generic/misc/presentational/Error';

const CreateDocumentFolderModal = () => {
    const disptach = useDispatch();
    const [form, handleChange] = useForm({ key: '' });
    const prefix = useQueryParam('prefix') || '';

    const isPosting = useSelector(selectIsPosting);
    const error = useSelector(selectError);
    const success = useSelector(selectIsSuccess);

    const handleSubmit = () => {
        const folderPrefix = prefix ? `${prefix}/` : '';
        const key = `${folderPrefix}${form.key}`;

        disptach(createDocumentLibraryFolder({ key }));
    };

    const handleCancel = () => {
        disptach(hideModal());
    };

    const prevSuccess = usePrevious(success);
    useEffect(() => {
        if (!prevSuccess && success) disptach(hideModal());
    }, [success, prevSuccess]);

    return (
        <ModalOuterContainer>
            <BlockHeading>Create folder</BlockHeading>
            <Form onSubmit={handleSubmit}>

                <Field required name="Name">
                    <TextInputContainer 
                        name="key" 
                        value={form.key} 
                        handleChange={handleChange}
                        required
                        placeholder="Enter a folder name..."
                    />
                </Field>

                <BlockButtonWrapper>
                    <button onClick={handleSubmit} 
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        type={isPosting ? 'button' : 'submit'}
                        disabled={isPosting}
                    >
                        {isPosting ? <LoadingIcon /> : 'Submit'}
                    </button>
                    <ButtonContainer handleClick={handleCancel}>Cancel</ButtonContainer>
                </BlockButtonWrapper>
                {!!error && <Error>{error}</Error>}
            </Form>
        </ModalOuterContainer>
    );
};

const selectIsPosting = state => state.companyAdmin.documentLibraryReducer.isPosting;
const selectError = state => state.companyAdmin.documentLibraryReducer.postError;
const selectIsSuccess = state => state.companyAdmin.documentLibraryReducer.postSuccess;

export default CreateDocumentFolderModal;