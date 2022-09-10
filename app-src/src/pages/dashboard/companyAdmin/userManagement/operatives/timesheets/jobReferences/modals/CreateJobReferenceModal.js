import React from 'react';

import useCreateJobReference from '../hooks/useCreateJobReference';

import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import TextAreaContainer from 'components_DEPRECATED/shared/generic/form/containers/TextAreaContainer';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';

const CreateJobReferenceModal = ({ hideModal }) => {
    const { isPosting, form, handleChange, handleSubmit } = useCreateJobReference();

    return (
        <FlexModalOuter title="Create Job Reference">
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Name" required>
                            <TextInputContainer
                                name="name"
                                value={form.name}
                                handleChange={handleChange}
                                required
                            />
                        </Field>

                        <Field name="Description">
                            <TextAreaContainer
                                name="description"
                                value={form.description}
                                handleChange={handleChange}
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton text="Cancel" source="secondary" onClick={hideModal} />
                    <ActionButton
                        text="Save"
                        icon={isPosting ? 'spinner' : 'save'}
                        iconSpin={isPosting}
                        ambient="positive"
                        disabled={isPosting}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default CreateJobReferenceModal;
