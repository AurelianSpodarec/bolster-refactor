import React from 'react';
import { useSelector } from 'react-redux';

import { measurementDropdownOptions } from 'constants/shared/dropdowns';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';
import { selectFieldError } from 'selectors/shared/fieldErrors';

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
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const priceBreaksError = useSelector(state =>
        selectFieldError(state, 'measurementPriceBreaks'),
    );

    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const singularTypeName = pinOptionType.name;

    const {
        form,
        handleChange,
        handlePriceBreakChange,
        handleAddPriceBreak,
        handleRemovePriceBreak,
        handleSubmit,
        isPosting,
        error,
        setError,
    } = useCreateOptionValue(pinOptionTypeID, pinOptionSetID);

    const availableServiceOptions = useGetAvailableServices(pinOptionSetID);

    const priceBreaksLength = form.measurementPriceBreaks.length;
    const isMultiplePriceBreaks = priceBreaksLength > 1;

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
                        <Field name="Unit of Measurement" required>
                            <DropdownContainer
                                name="measurementType"
                                options={Object.values(measurementDropdownOptions)}
                                selectedOption={measurementDropdownOptions[form.measurementType]}
                                handleChange={handleChange}
                                withoutPlaceholder
                                required
                            />
                        </Field>

                        <div className="measurement-fields-grid">
                            <Field name="Measurement" />
                            <Field name="Price" />
                            <Field name="" />

                            {form.measurementPriceBreaks.map((priceBreak, index) => {
                                const isLast = index === priceBreaksLength - 1;

                                return (
                                    <React.Fragment key={index}>
                                        <Field>
                                            <NumberInputContainer
                                                name={`measurementPriceBreaks[${index}].value`}
                                                value={priceBreak.value}
                                                placeholder="Type value"
                                                handleFocus={() => {
                                                    if (isLast) handleAddPriceBreak();
                                                }}
                                                handleChange={(_, value) => {
                                                    handlePriceBreakChange(index, 'value', value);
                                                    setError(null);
                                                }}
                                            />
                                        </Field>

                                        <Field>
                                            <NumberInputContainer
                                                name={`measurementPriceBreaks[${index}].cost`}
                                                value={priceBreak.cost}
                                                placeholder="Type price"
                                                handleFocus={() => {
                                                    if (isLast) handleAddPriceBreak();
                                                }}
                                                handleChange={(_, value) => {
                                                    handlePriceBreakChange(index, 'cost', value);
                                                    setError(null);
                                                }}
                                            />
                                        </Field>

                                        <Field>
                                            <ActionButton
                                                source="secondary"
                                                icon="trash-alt"
                                                iconOnly
                                                iconWeight="regular"
                                                disabled={!isMultiplePriceBreaks}
                                                onClick={() => {
                                                    handleRemovePriceBreak(index);
                                                    setError(null);
                                                }}
                                            />
                                        </Field>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {priceBreaksError ||
                            (error && (
                                <Field classes="no-min-height">
                                    <p className="error red-text text-accent-4">
                                        {priceBreaksError || error}
                                    </p>
                                </Field>
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
