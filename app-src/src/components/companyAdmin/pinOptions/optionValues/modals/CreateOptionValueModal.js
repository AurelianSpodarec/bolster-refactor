import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { measurementDropdownOptions } from 'constants/shared/dropdowns';
import { MEASUREMENT_TYPES, MEASUREMENT_TYPES_OUTPUTS_PLURAL } from 'constants/companyAdmin/enums';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useCreateOptionValue from '../hooks/useCreateOptionValue';
import useGetAvailableServices from '../hooks/useGetAvailableServices';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';
import DropdownContainer from 'components/shared/generic/form/containers/DropdownContainer';
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';
import ClosingConfirmationModal from 'components/shared/generic/modals/presentational/ClosingConfirmationModal';
import useBolsterPlus from 'components/companyAdmin/subscription/addOns/hooks/useBolsterPlus';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import useIsAdminPlus from '../../../../../hooks/useIsAdminPlus';

const CreateOptionValueModal = ({ pinOptionTypeID, pinOptionSetID }) => {
    const [showClosingConfirmationModal, setShowClosingConfirmationModal] = useState(false);
    const pinOptionType = useSelector(state => selectPinOptionType(state, pinOptionTypeID));
    const singularTypeName = pinOptionType.name;
    const { isBolsterPlusActivated } = useBolsterPlus();

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
        isNotModified,
        servicesError,
        handleServicesChange,
    } = useCreateOptionValue(pinOptionTypeID, pinOptionSetID);

    const availableServiceOptions = useGetAvailableServices(pinOptionSetID);

    const priceBreaksLength = form.measurementPriceBreaks.length;
    const isMultiplePriceBreaks = priceBreaksLength > 1;

    const measurementTypeOutput = MEASUREMENT_TYPES_OUTPUTS_PLURAL[form.measurementType];
    const isFixedPrice = +form.measurementType === MEASUREMENT_TYPES.FIXED;

    const isAdminPlus = useIsAdminPlus();
    const hasPricingAccess = isBolsterPlusActivated && isAdminPlus;
    const hasNoPricingAccess = !isBolsterPlusActivated || !isAdminPlus;

    return (
        <FlexModalOuter
            title={`Add ${singularTypeName}`}
            handleClose={!isNotModified ? () => setShowClosingConfirmationModal(true) : null}
            headingChildren={
                availableServiceOptions.length > 1 && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={availableServiceOptions}
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
                    <p className="generic-text size-lg-12">
                        {`Create an ${singularTypeName}${
                            pinOptionType.hasCosting
                                ? ' and apply prices to different measurements'
                                : ''
                        }.`}
                    </p>

                    {pinOptionType.hasCosting && (
                        <p className="generic-text size-lg-12">
                            Your operatives will be able to apply a measurement to each{' '}
                            {singularTypeName} used on a history to calculate a price associated to
                            that pin.
                        </p>
                    )}

                    <div className="form-fields-container size-lg-12">
                        <Field name="Name" required>
                            <TextInputContainer
                                name="name"
                                value={form.name}
                                handleChange={handleChange}
                                placeholder="Type name"
                                required
                            />
                        </Field>

                        <Field name="Short Name" labelClasses="small-margin">
                            <p className="generic-text size-lg-12">
                                This is how the pin option will output through the app.
                            </p>
                            <TextInputContainer
                                name="shortName"
                                value={form.shortName}
                                handleChange={handleChange}
                                placeholder="Type short name"
                            />
                        </Field>

                        {pinOptionType.hasCosting && isAdminPlus && (
                            <>
                                <TooltipContainer
                                    shouldOutput={!hasPricingAccess}
                                    text={
                                        !isBolsterPlusActivated
                                            ? 'Measurements are available through Bolster Plus.'
                                            : 'Measurements are available for Admin Plus users only.'
                                    }
                                    side="top"
                                    containerSide="left"
                                >
                                    <Field
                                        name="Unit of Measurement"
                                        classes={`${!hasPricingAccess && 'grey-out'}`}
                                    >
                                        <DropdownContainer
                                            name="measurementType"
                                            options={Object.values(measurementDropdownOptions)}
                                            selectedOption={
                                                measurementDropdownOptions[form.measurementType]
                                            }
                                            handleChange={handleChange}
                                            disabled={hasNoPricingAccess}
                                        />
                                    </Field>
                                    {(!isBolsterPlusActivated || !!form.measurementType) && (
                                        <>
                                            {measurementTypeOutput && (
                                                <Field classes="no-min-height">
                                                    <p className="generic-text size-lg-12">
                                                        {`Please enter your measurement breakpoints in ${measurementTypeOutput}.`}
                                                    </p>
                                                </Field>
                                            )}

                                            <div
                                                className={`measurement-fields-grid ${
                                                    !hasPricingAccess ? 'grey-out' : ''
                                                } ${isFixedPrice ? 'fixed-price' : ''}`}
                                            >
                                                <>
                                                    {!isFixedPrice && (
                                                        <Field name="Measurement" required />
                                                    )}
                                                    <Field name="Sell Cost" required />
                                                    <Field name="Labour Cost" />
                                                    <Field name="" />
                                                </>

                                                {form.measurementPriceBreaks.map(
                                                    (priceBreak, index) => {
                                                        const isLast =
                                                            index === priceBreaksLength - 1;

                                                        return (
                                                            <React.Fragment key={index}>
                                                                {!isFixedPrice && (
                                                                    <Field>
                                                                        <NumberInputContainer
                                                                            name={`measurementPriceBreaks[${index}].value`}
                                                                            value={priceBreak.value}
                                                                            placeholder="Type value"
                                                                            handleFocus={() => {
                                                                                if (isLast)
                                                                                    handleAddPriceBreak();
                                                                            }}
                                                                            handleChange={(
                                                                                _,
                                                                                value,
                                                                            ) => {
                                                                                handlePriceBreakChange(
                                                                                    index,
                                                                                    'value',
                                                                                    value,
                                                                                );
                                                                                setError(null);
                                                                            }}
                                                                            disableMouseWheelControl
                                                                            disableUpDownArrowControl
                                                                            disabled={
                                                                                !hasPricingAccess
                                                                            }
                                                                        />
                                                                    </Field>
                                                                )}
                                                                <Field>
                                                                    <NumberInputContainer
                                                                        name={`measurementPriceBreaks[${index}].cost`}
                                                                        value={priceBreak.cost}
                                                                        placeholder="Type price"
                                                                        handleFocus={() => {
                                                                            if (isLast)
                                                                                handleAddPriceBreak();
                                                                        }}
                                                                        handleChange={(
                                                                            _,
                                                                            value,
                                                                        ) => {
                                                                            handlePriceBreakChange(
                                                                                index,
                                                                                'cost',
                                                                                value,
                                                                            );
                                                                            setError(null);
                                                                        }}
                                                                        disableMouseWheelControl
                                                                        disableUpDownArrowControl
                                                                        disabled={!hasPricingAccess}
                                                                    />
                                                                </Field>

                                                                <Field>
                                                                    <NumberInputContainer
                                                                        name={`measurementPriceBreaks[${index}].labourCost`}
                                                                        value={
                                                                            priceBreak.labourCost
                                                                        }
                                                                        placeholder="Type price"
                                                                        handleFocus={() => {
                                                                            if (isLast)
                                                                                handleAddPriceBreak();
                                                                        }}
                                                                        handleChange={(
                                                                            _,
                                                                            value,
                                                                        ) => {
                                                                            handlePriceBreakChange(
                                                                                index,
                                                                                'labourCost',
                                                                                value,
                                                                            );
                                                                            setError(null);
                                                                        }}
                                                                        disableMouseWheelControl
                                                                        disableUpDownArrowControl
                                                                        disabled={!hasPricingAccess}
                                                                    />
                                                                </Field>
                                                                <Field>
                                                                    <ActionButton
                                                                        source="secondary"
                                                                        icon="trash-alt"
                                                                        iconOnly
                                                                        iconWeight="regular"
                                                                        disabled={
                                                                            !isMultiplePriceBreaks ||
                                                                            !hasPricingAccess
                                                                        }
                                                                        onClick={() => {
                                                                            handleRemovePriceBreak(
                                                                                index,
                                                                            );
                                                                            setError(null);
                                                                        }}
                                                                    />
                                                                </Field>
                                                            </React.Fragment>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </>
                                    )}
                                </TooltipContainer>
                            </>
                        )}
                    </div>
                </div>
                {error && <div className="error-message">{error}</div>}
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

            {showClosingConfirmationModal && (
                <ClosingConfirmationModal
                    title={`Leave ${singularTypeName}?`}
                    primaryButtonText="Stay and edit"
                    secondaryButtonText="Leave"
                    handlePrimaryButton={() => setShowClosingConfirmationModal(false)}
                />
            )}
        </FlexModalOuter>
    );
};

export default CreateOptionValueModal;
