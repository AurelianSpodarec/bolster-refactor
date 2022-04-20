import React from 'react';
import { useSelector } from 'react-redux';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useCreateOptionValue from '../hooks/useCreateOptionValue';
import useGetAvailableServices from '../hooks/useGetAvailableServices';

import ModalOuterContainer from 'components/shared/generic/modals/containers/ModalOuterContainer';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ModalHeading from 'components/shared/generic/modals/presentational/ModalHeading';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const singularTypeName = pinOptionType.name;

    const { form, handleChange, handlePriceBreakChange, handleSubmit, isPosting } =
        useCreateOptionValue(pinOptionTypeID, pinOptionSetID);

    const availableServiceOptions = useGetAvailableServices(pinOptionSetID);

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Add ${singularTypeName}`}>
                {!!availableServiceOptions.length && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={availableServiceOptions}
                        selectedOptions={form.serviceIDs}
                        handleChange={handleChange}
                        isNumberValues
                        scrollElementID="modal-block"
                    />
                )}
            </ModalHeading>

            <p className="generic-text size-lg-12">
                Create an {singularTypeName.toLowerCase()} and apply prices to different
                measurements.
            </p>

            <p className="generic-text size-lg-12">
                Your operatives will be able to apply a measurement to each{' '}
                {singularTypeName.toLowerCase()} used on a history to calculate a price associated
                to that pin.
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

                <Field name="Short Name" required>
                    <TextInputContainer
                        name="shortName"
                        value={form.shortName}
                        handleChange={handleChange}
                        placeholder="Type short name"
                        required
                    />
                </Field>

                {pinOptionType.hasCosting && (
                    <>
                        <Field name="Unit of Measurement">
                            <DropdownContainer
                                name="unit of measurement"
                                options={[]}
                                value={''}
                                selectedOption={''}
                                handleChange={handleChange}
                                placeholder={''}
                            />
                        </Field>

                        <Field name="Measurement" />

                        {form.measurementPriceBreaks.map((priceBreak, index) => (
                            <>
                                <TextInputContainer
                                    name=""
                                    value={priceBreak.value}
                                    placeholder={`Value ${index}`}
                                    handleChange={(_, value) =>
                                        handlePriceBreakChange(index, 'value', value)
                                    }
                                />

                                <TextInputContainer
                                    name=""
                                    value={priceBreak.cost}
                                    placeholder={`Cost ${index}`}
                                    handleChange={(_, value) =>
                                        handlePriceBreakChange(index, 'cost', value)
                                    }
                                />
                            </>
                        ))}
                    </>
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

export default CreateOptionValueModal;
