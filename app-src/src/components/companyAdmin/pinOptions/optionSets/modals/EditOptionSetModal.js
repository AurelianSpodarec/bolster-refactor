import React from 'react';

import useEditOptionSet from '../hooks/useEditOptionSet';

import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditOptionSetModal = ({ set }) => {
    const {
        form,
        handleChange,
        handleSubmit,
        isPosting,
        serviceOptions,
        servicesError,
        handleServicesChange,
    } = useEditOptionSet(set);

    return (
        <FlexModalOuter
            title={`Edit ${set.name}`}
            headingChildren={
                serviceOptions.length > 1 && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={serviceOptions}
                        selectedOptions={form.serviceIDs}
                        handleChange={handleServicesChange}
                        isNumberValues
                        scrollElementID="modal-block"
                        error={servicesError}
                    />
                )
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
                        disabled={isPosting || servicesError}
                        type="submit"
                    />
                </ButtonWrapper>
            </Form>
        </FlexModalOuter>
    );
};

export default EditOptionSetModal;
