import React from 'react';
import ModalOuterContainer from 'components_DEPRECATED/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import BlockHeading from 'components_DEPRECATED/shared/generic/blockHeading/presentational/BlockHeading';
import { useState } from 'react';
import FileUploadContainer from 'components_DEPRECATED/shared/generic/form/containers/FileUploadContainer';
import { useDispatch } from 'react-redux';
import postUploadUserDocuments from 'actions/companyAdmin/userManagement/async/postUploadUserDocuments';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const EditUserDocumentModal = ({ adminId, hideModal }) => {
    const dispatch = useDispatch();
    const [form, setFormChange] = useState({
        name: '',
        document: '',
    });

    const handleChange = (name, value) => {
        setFormChange({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const postBody = {
            UserId: +adminId,
            S3Link: form.document,
            FriendlyName: form.name,
        };

        dispatch(postUploadUserDocuments(postBody));
        hideModal();
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit User Document" />
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-12">
                    <Field name="Document" required>
                        <FileUploadContainer
                            name="document"
                            acceptedTypes={['application/pdf', 'image/*']}
                            value={form.document}
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                </div>

                <div className="size-lg-12">
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Cancel"
                            onClick={hideModal}
                            source="secondary"
                            size="small"
                        />
                        <ActionButton text="Confirm" type="submit" icon="check" size="small" />
                    </ButtonWrapper>
                </div>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditUserDocumentModal;
