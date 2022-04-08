import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import useCreatePrelim from '../hooks/useCreatePrelim';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const CreatePrelimModal = () => {
    const { form, handleChange, handleSubmit, isPosting } = useCreatePrelim();
    return (
        <ModalOuterContainer>
            <BlockHeading title="Add prelim" />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Prelim name"
                        required
                    />
                </Field>

                <Field name="Type" required>
                    <TextInputContainer
                        name="type"
                        value={form.type}
                        handleChange={handleChange}
                        placeholder="Prelim type"
                        required
                    />
                </Field>

                <Field name="Value" required>
                    <TextInputContainer
                        name="value"
                        value={form.value}
                        handleChange={handleChange}
                        placeholder="Prelim value"
                        required
                    />
                </Field>

                <BlockButtonWrapper>
                    <button
                        className={`button green ${isPosting ? 'disabled' : ''}`}
                        disabled={isPosting}
                    >
                        <i className={`fa fa-${isPosting ? 'spinner fa-spin' : 'save'}`}></i> Save
                    </button>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default CreatePrelimModal;
