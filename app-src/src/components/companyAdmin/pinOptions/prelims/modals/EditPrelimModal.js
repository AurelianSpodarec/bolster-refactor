import React from 'react';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import useCreatePrelim from '../hooks/useCreatePrelim';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const EditPrelimModal = () => {
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
                    <DropdownContainer
                        placeholder="Choose prelim type"
                        name="type"
                        options={[{ value: 1, text: 'percent' }]}
                        value={form.type}
                        selectedOption={form.type}
                        handleChange={handleChange}
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

export default EditPrelimModal;
