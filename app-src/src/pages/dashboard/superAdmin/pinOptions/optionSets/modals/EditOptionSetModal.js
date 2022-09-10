import React from 'react';

import useEditOptionSet from '../hooks/useEditOptionSet';

import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import TextInputContainer from 'components_DEPRECATED/shared/generic/form/containers/TextInputContainer';
import Field from 'components_DEPRECATED/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonMultiDropdown from 'components_DEPRECATED/shared/filters/ButtonMultiDropdown';
import FlexModalOuter from 'components_DEPRECATED/shared/generic/modals/presentational/FlexModalOuter';

const EditOptionSetModal = ({ set }) => {
    const { form, handleChange, handleSubmit, isPosting, serviceOptions } = useEditOptionSet(set);

    return (
        <FlexModalOuter
            title={`Edit ${set.name}`}
            headingChildren={
                <ButtonMultiDropdown
                    buttonText="Services"
                    name="serviceIDs"
                    options={serviceOptions}
                    selectedOptions={form.serviceIDs}
                    handleChange={handleChange}
                    isNumberValues
                    scrollElementID="modal-block"
                />
            }
        >
            <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
                <div className="flex-content">
                    <div className="form-fields-container">
                        <Field name="Name" required>
                            <TextInputContainer
                                name="name"
                                value={form.name}
                                handleChange={handleChange}
                                placeholder="Type name"
                                required
                            />
                        </Field>
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
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

export default EditOptionSetModal;
