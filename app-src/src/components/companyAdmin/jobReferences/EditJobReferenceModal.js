import React from 'react';

import useEditJobReference from './hooks/useEditJobReference';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components/shared/generic/form/containers/TextAreaContainer';

const EditJobReferenceModal = ({ hideModal, jobReference }) => {
    const { isPosting, form, handleChange, handleSubmit } = useEditJobReference(jobReference);

    return (
        <ModalOuterContainer>
            <BlockHeading title="Edit Job Reference" />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <Field name="Description" required>
                    <TextAreaContainer
                        name="description"
                        value={form.description}
                        handleChange={handleChange}
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <button className={`button green ${isPosting ? 'disabled' : ''}`}>
                        <i className={`fa fa-fw ${isPosting ? 'fa-spinner fa-spin' : 'fa-save'}`} />
                        {isPosting ? 'Please wait...' : 'Submit'}
                    </button>
                    <button className="button" onClick={hideModal}>
                        Cancel
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditJobReferenceModal;
