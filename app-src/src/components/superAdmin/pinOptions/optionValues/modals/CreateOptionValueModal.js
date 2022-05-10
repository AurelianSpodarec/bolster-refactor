import { useSelector } from 'react-redux';
import ModalOuterContainer from '../../../../shared/generic/modals/containers/ModalOuterContainer';
import ModalHeading from '../../../../shared/generic/modals/presentational/ModalHeading';
import ButtonMultiDropdown from '../../../../shared/filters/ButtonMultiDropdown';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../shared/generic/form/containers/TextInputContainer';
import React from 'react';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import { selectPinOptionType } from '../../../../../selectors/superAdmin/pinOptionTypes';
import { selectServices } from '../../../../../selectors/superAdmin/services';
import useCreateOptionValue from '../hooks/useCreateOptionValue';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const singularTypeName = pinOptionType.name;

    const { form, handleChange, handleSubmit, isPosting } = useCreateOptionValue(
        pinOptionTypeID,
        pinOptionSetID,
    );

    const services = useSelector(selectServices);
    const serviceOptions = Object.values(services).map(service => ({
        value: service.id,
        text: service.name,
    }));

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Add ${singularTypeName}`}>
                {!!serviceOptions.length && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={serviceOptions}
                        selectedOptions={form.serviceIDs}
                        handleChange={handleChange}
                        isNumberValues
                        scrollElementID="modal-block"
                    />
                )}
            </ModalHeading>

            <p className="generic-text size-lg-12">
                This is how the pin option will output through the app
            </p>

            <p className="generic-text size-lg-12">{`Create an ${singularTypeName}`}</p>

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

                <Field name="Short Name">
                    <TextInputContainer
                        name="shortName"
                        value={form.shortName}
                        handleChange={handleChange}
                        placeholder="Type short name"
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

export default CreateOptionValueModal;
