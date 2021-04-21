import React from 'react';
import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { useState } from 'react';
import FileUploadContainer from 'components/shared/generic/form/containers/FileUploadContainer';
import { useDispatch } from 'react-redux';
import postUploadUserDocuments from 'actions/companyAdmin/userManagement/async/postUploadUserDocuments';

const NewUserDocumentModal = ({ hideModal }) => {
    const dispatch = useDispatch();
    const [form, setFormChange] = useState({
        name: 'Untitled Name',
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
            S3Link: form.document,
            FriendlyName: form.name,
        };

        dispatch(postUploadUserDocuments(postBody));
    };

    return (
        <ModalOuterContainer>
            <BlockHeading title="Upload New User Document" />
            <Form className="generic-form size-lg-12" onSubmit={handleSubmit}>
                <div className="size-lg-12">
                    <Field name="Name" required>
                        <TextInputContainer
                            name="name"
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
                            value={form.document}
                            handleChange={handleChange}
                            required
                        />
                    </Field>
                </div>

                <BlockButtonWrapper>
                    <button type="submit" className="button green">
                        <i className="fa fa-save" />
                        Upload
                    </button>
                    <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default NewUserDocumentModal;
