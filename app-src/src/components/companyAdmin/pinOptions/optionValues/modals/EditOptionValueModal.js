import React from 'react';

import useEditOptionValue from '../hooks/useEditOptionValue';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';

const EditOptionValueModal = ({ option }) => {
    const { form, handleChange, handleSubmit, isPosting, serviceOptions } =
        useEditOptionValue(option);

    return (
        <ModalOuterContainer>
            <BlockHeading title={`Edit ${option.name}`} />

            <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
                <Field name="Name" required>
                    <TextInputContainer
                        name="name"
                        value={form.name}
                        handleChange={handleChange}
                        placeholder="Type name"
                        required
                    />
                </Field>

                <Field name="Short Name" required>
                    <TextInputContainer
                        name="shortName"
                        value={form.shortName}
                        handleChange={handleChange}
                        placeholder="Type short name"
                        required
                    />
                </Field>

                {serviceOptions.length > 0 && (
                    <Field name="Services">
                        <CheckboxListContainer
                            name="serviceIDs"
                            text=""
                            handleChange={handleChange}
                            selectedOptions={form.serviceIDs}
                            options={serviceOptions}
                            isNumberValues
                        />
                    </Field>
                )}

                <BlockButtonWrapper>
                    <ButtonWrapper alignment="right">
                        <ActionButton
                            text="Save"
                            icon={isPosting ? 'spinner' : 'save'}
                            iconSpin={isPosting}
                            ambient="positive"
                            size="medium"
                            disabled={isPosting}
                            type="submit"
                        />
                    </ButtonWrapper>
                </BlockButtonWrapper>
            </Form>
        </ModalOuterContainer>
    );
};

export default EditOptionValueModal;
