import { useSelector } from 'react-redux';
import React from 'react';
import ModalOuterContainer from '../../../../shared/generic/modals/containers/ModalOuterContainer';
import ModalHeading from '../../../../shared/generic/modals/presentational/ModalHeading';
import ButtonMultiDropdown from '../../../../shared/filters/ButtonMultiDropdown';
import Form from '../../../../shared/generic/form/containers/Form';
import Field from '../../../../shared/generic/form/presentational/Field';
import TextInputContainer from '../../../../shared/generic/form/containers/TextInputContainer';
import ActionButton from '../../../../shared/generic/button/presentational/ActionButton';
import BlockButtonWrapper from '../../../../shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from '../../../../shared/generic/button/presentational/ButtonWrapper';
import { selectServicesArr } from '../../../../../selectors/superAdmin/services';
import useEditOptionValue from '../hooks/useEditOptionValue';

const EditOptionValueModal = ({ option }) => {
    const { form, handleChange, handleSubmit, isPosting } = useEditOptionValue(option);

    const services = useSelector(selectServicesArr);
    const serviceOptions = services.map(service => ({
        value: service.id,
        text: service.name,
    }));

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Edit ${option.name}`}>
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
                    <p className="generic-text size-lg-12">
                        This is how the pin option will output through the app
                    </p>
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

export default EditOptionValueModal;
