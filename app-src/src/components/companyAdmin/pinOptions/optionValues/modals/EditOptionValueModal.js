import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { measurementDropdownOptions } from '../../../../../constants/shared/dropdowns';
import { MEASUREMENT_TYPES_OUTPUTS_PLURAL } from 'constants/companyAdmin/enums';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useEditOptionValue from '../hooks/useEditOptionValue';
import useGetAvailableServices from '../hooks/useGetAvailableServices';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonMultiDropdown from 'components/shared/filters/ButtonMultiDropdown';
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';
import JustToCheckModal from './JustToCheckModal';
import DropdownContainer from '../../../../shared/generic/form/containers/DropdownContainer';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import FlexModalOuter from 'components/shared/generic/modals/presentational/FlexModalOuter';

const EditOptionValueModal = ({ option, typeID }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, option.pinOptionTypeID));
    const [showJustToCheckModal, setShowJustToCheckModal] = useState(false);
    const [showClosingConfirmationModal, setShowClosingConfirmationModal] = useState(false);
    const canEditMeasurement = option.costMeasurementType === null;
    const selectedPinOptionType = useSelector(state => selectPinOptionType(state, typeID));

    const {
        form,
        handleChange,
        handlePriceBreakChange,
        handleAddPriceBreak,
        handleRemovePriceBreak,
        handleQuickPriceEditChange,
        handleSubmit,
        isPosting,
        error,
        setError,
        latestPinOptionVersion,
        initialPriceBreaks,
    } = useEditOptionValue(option);

    const isServiceIDsModified =
        form.serviceIDs.length === 0
            ? form.serviceIDs.length === 0
            : form.serviceIDs === option.serviceIDs;

    const isNotModified =
        form.name === latestPinOptionVersion.name &&
        form.shortName === latestPinOptionVersion.shortName &&
        isServiceIDsModified &&
        form.costMeasurementType === option.costMeasurementType &&
        JSON.stringify(form.measurementPriceBreaks) === JSON.stringify(initialPriceBreaks);

    const availableServiceOptions = useGetAvailableServices(option.pinOptionSetID);

    const priceBreaksLength = form.measurementPriceBreaks.length;
    const isMultiplePriceBreaks = priceBreaksLength > 1;

    const measurementTypeOutput = MEASUREMENT_TYPES_OUTPUTS_PLURAL[form.costMeasurementType];

    const MeasurementWrapper = ({ children }) => {
        if (canEditMeasurement) return <>{children}</>;
        return (
            <TooltipContainer
                side="top"
                text="The measurement type has already been set, this cannot be changed."
                extraContainerClasses="full"
            >
                {children}
            </TooltipContainer>
        );
    };

    return (
        <FlexModalOuter
            title={`Edit ${option.name}`}
            showClosingConfirmationModal={showClosingConfirmationModal}
            setShowClosingConfirmationModal={setShowClosingConfirmationModal}
            closingConfirmation={!isNotModified}
            headingChildren={
                !!availableServiceOptions.length && (
                    <ButtonMultiDropdown
                        buttonText="Services"
                        name="serviceIDs"
                        options={availableServiceOptions}
                        selectedOptions={form.serviceIDs}
                        handleChange={handleChange}
                        isNumberValues
                        scrollElementID="modal-block"
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

                        {pinOptionType.hasCosting && (
                            <>
                                <Field name="Unit of Measurement">
                                    <MeasurementWrapper>
                                        <DropdownContainer
                                            name="costMeasurementType"
                                            options={Object.values(measurementDropdownOptions)}
                                            selectedOption={
                                                measurementDropdownOptions[form.costMeasurementType]
                                            }
                                            handleChange={handleChange}
                                            disabled={!canEditMeasurement}
                                        />
                                    </MeasurementWrapper>
                                </Field>

                                {!!form.costMeasurementType && (
                                    <>
                                        {!canEditMeasurement && (
                                            <Field name="Quick Price Edit (%)">
                                                <NumberInputContainer
                                                    name="quickPriceEdit"
                                                    value={form.quickPriceEdit}
                                                    handleChange={handleQuickPriceEditChange}
                                                    placeholder="Type percentage"
                                                />
                                            </Field>
                                        )}

                                        {measurementTypeOutput && (
                                            <Field classes="no-min-height">
                                                <p className="generic-text size-lg-12">
                                                    {`Please enter your measurement breakpoints in ${measurementTypeOutput}.`}
                                                </p>
                                            </Field>
                                        )}

                                        <div className="measurement-fields-grid">
                                            <Field name="Measurement" />
                                            <Field name="Price" />
                                            <Field name="" />

                                            {form.measurementPriceBreaks.map(
                                                (priceBreak, index) => {
                                                    const isLast = index === priceBreaksLength - 1;

                                                    return (
                                                        <React.Fragment key={index}>
                                                            <Field>
                                                                <NumberInputContainer
                                                                    name={`measurementPriceBreaks[${index}].value`}
                                                                    value={priceBreak.value}
                                                                    placeholder="Type value"
                                                                    minNum={0}
                                                                    handleFocus={() => {
                                                                        if (isLast)
                                                                            handleAddPriceBreak();
                                                                    }}
                                                                    handleChange={(_, value) => {
                                                                        handlePriceBreakChange(
                                                                            index,
                                                                            'value',
                                                                            value,
                                                                        );
                                                                        setError(null);
                                                                    }}
                                                                    disableMouseWheelControl
                                                                    disableUpDownArrowControl
                                                                />
                                                            </Field>

                                                            <Field>
                                                                <NumberInputContainer
                                                                    name={`measurementPriceBreaks[${index}].cost`}
                                                                    value={priceBreak.cost}
                                                                    placeholder="Type price"
                                                                    minNum={0}
                                                                    handleFocus={() => {
                                                                        if (isLast)
                                                                            handleAddPriceBreak();
                                                                    }}
                                                                    handleChange={(_, value) => {
                                                                        handlePriceBreakChange(
                                                                            index,
                                                                            'cost',
                                                                            value,
                                                                        );
                                                                        setError(null);
                                                                    }}
                                                                    disableMouseWheelControl
                                                                    disableUpDownArrowControl
                                                                />
                                                            </Field>

                                                            <Field>
                                                                <ActionButton
                                                                    source="secondary"
                                                                    icon="trash-alt"
                                                                    iconOnly
                                                                    iconWeight="regular"
                                                                    disabled={
                                                                        !isMultiplePriceBreaks
                                                                    }
                                                                    onClick={() => {
                                                                        handleRemovePriceBreak(
                                                                            index,
                                                                        );
                                                                    }}
                                                                />
                                                            </Field>
                                                        </React.Fragment>
                                                    );
                                                },
                                            )}
                                        </div>

                                        {error && (
                                            <Field classes="no-min-height">
                                                <p className="error red-text text-accent-4">
                                                    {error}
                                                </p>
                                            </Field>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

                <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
                    <ActionButton
                        text="Save"
                        icon={isPosting ? 'spinner' : 'save'}
                        iconSpin={isPosting}
                        ambient="positive"
                        disabled={isPosting}
                        onClick={() => setShowJustToCheckModal(true)}
                    />
                </ButtonWrapper>
            </Form>

            {selectedPinOptionType.tabName === 'Installations' && (
                <JustToCheckModal
                    showJustToCheckModal={showJustToCheckModal}
                    setShowJustToCheckModal={setShowJustToCheckModal}
                />
            )}
        </FlexModalOuter>
    );
};

export default EditOptionValueModal;
