import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import { useForm, usePrevious, useQueryParam } from 'helpers/hooks';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import hideModal from 'actions/shared/generic/modals/sync/hideModal';
import createDocumentLibraryFolder from 'actions/companyAdmin/documentLibrary/async/createDocumentLibraryFolder';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const CreateDocumentFolderModal = () => {
    const disptach = useDispatch();
    const [form, handleChange] = useForm({ key: '', isViewApp: false, isAttachPins: false });
    const prefix = useQueryParam('prefix') || '';

    const isPosting = useSelector(selectIsPosting);
    const error = useSelector(selectError);
    const success = useSelector(selectIsSuccess);

    const handleSubmit = () => {
        const folderPrefix = prefix ? `${prefix}/` : '';
        const key = `${folderPrefix}${form.key}`;
        const isViewApp = form.isViewApp;
        const isAttachPins = form.isAttachPins;

        const body = {
            key,
            isViewApp,
            isAttachPins,
        };
        disptach(createDocumentLibraryFolder(body));
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
            <BlockHeading title="Create folder" />
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

                <Field>
                    <p>Document Use:</p>
                    <div className="checkbox-items">
                        <CheckboxContainer
                            name="isViewApp"
                            checked={form.isViewApp}
                            text="View in app"
                            handleChange={handleChange}
                        />
                        <CheckboxContainer
                            name="isAttachPins"
                            checked={form.isAttachPins}
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

export default CreateDocumentFolderModal;
