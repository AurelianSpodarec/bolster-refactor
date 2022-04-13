import React from 'react';

import { PIN_OPTION_SETS_ENUM, PIN_OPTION_TYPES_ENUM } from 'constants/companyAdmin/enums';

import useCreateOptionSet from '../hooks/useCreateOptionSet';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';

const CreateOptionSetModal = ({ pinOptionTypeID }) => {
    const typeName = PIN_OPTION_TYPES_ENUM[pinOptionTypeID];
    const setName = PIN_OPTION_SETS_ENUM[pinOptionTypeID];

    const { form, handleChange, handleSubmit, isPosting, serviceOptions } =
        useCreateOptionSet(pinOptionTypeID);

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Create ${setName}`}>
                <ButtonMultiDropdown
                    buttonText="Services"
                    name="serviceIDs"
                    options={serviceOptions}
                    selectedOptions={form.serviceIDs}
                    handleChange={handleChange}
                    isNumberValues
                />
            </ModalHeading>

            <p className="generic-text size-lg-12">
                Create an '{setName.toLowerCase()}' for your sites.
            </p>

            <p className="generic-text size-lg-12">
                You will be able to set prices for your {typeName.toLowerCase()} and choose which
                options are available to your operatives through the app.
            </p>

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

export default CreateOptionSetModal;
