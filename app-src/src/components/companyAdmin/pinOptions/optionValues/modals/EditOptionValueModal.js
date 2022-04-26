import React from 'react';
import { useSelector } from 'react-redux';

import { selectPinOptionType } from 'selectors/companyAdmin/pinOptionTypes';

import useEditOptionValue from '../hooks/useEditOptionValue';
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
import NumberInputContainer from 'components/shared/generic/form/containers/NumberInputContainer';
import JustToCheckModal from './JustToCheckModal';

const EditOptionValueModal = ({ option }) => {
    const pinOptionType = useSelector(state => selectPinOptionType(state, option.pinOptionTypeID));
    const [showJustToCheckModal, setShowJustToCheckModal] = useState(true);

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
    } = useEditOptionValue(option);

    const availableServiceOptions = useGetAvailableServices(option.pinOptionSetID);

    const priceBreaksLength = form.measurementPriceBreaks.length;
    const isMultiplePriceBreaks = priceBreaksLength > 1;

    return (
        <ModalOuterContainer hideCloseButton>
            <ModalHeading title={`Edit ${option.name}`}>
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
                        <Field name="Quick Price Edit (%)">
                            <NumberInputContainer
                                name="quickPriceEdit"
                                value={form.quickPriceEdit}
                                handleChange={handleQuickPriceEditChange}
                                placeholder="Type percentage"
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
                                                }}
                                            />
                                        </Field>
                                    </React.Fragment>
                                );
                            })}
                        </div>

                        {error && (
                            <Field classes="no-min-height">
                                <p className="error red-text text-accent-4">{error}</p>
                            </Field>
                        )}
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
            <JustToCheckModal
                title="Overwrite prices?"
                text="Saving will overwrite previous pricing "
                showJustToCheckModal={showJustToCheckModal}
                setShowJustToCheckModal={setShowJustToCheckModal}
            />
        </ModalOuterContainer>
    );
};

export default EditOptionValueModal;
