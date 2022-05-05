import React from 'react';
import { useSelector } from 'react-redux';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useCreateOptionSet from '../hooks/useCreateOptionSet';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';

const CreateOptionSetModal = ({ pinOptionTypeID }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const pluralTypeName = pinOptionType.namePlural;
    const singularTypeName = pinOptionType.name;

    const { form, handleChange, handleSubmit, isPosting, serviceOptions } =
        useCreateOptionSet(pinOptionTypeID);
    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Create ${singularTypeName} Set`}>
                <ButtonMultiDropdown
                    buttonText="Services"
                    name="serviceIDs"
                    options={serviceOptions}
                    selectedOptions={form.serviceIDs}
                    handleChange={handleChange}
                    isNumberValues
                    scrollElementID="modal-block"
                />
            </ModalHeading>

            <p className="generic-text size-lg-12">
                Create an '{singularTypeName} set' for your sites.
            </p>

            {pinOptionType.hasCosting && (
                <p className="generic-text size-lg-12">
                    You will be able to set prices for your {pluralTypeName} and choose which
                    options are available to your operatives through the app.
                </p>
            )}

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
