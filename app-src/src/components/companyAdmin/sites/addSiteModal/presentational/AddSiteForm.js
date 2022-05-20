import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from '../../../../shared/generic/form/containers/CheckboxContainer';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import OptionsPodSetListContainer from 'components/shared/generic/form/containers/OptionPodSetListContainer';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';

const AddSiteForm = ({
    handleSubmit,
    handleInputChange,
    hideModal,
    name,
    client,
    addressLine1,
    addressLine2,
    postcode,
    isUsingBolsterLabels,
    isFetchingHierarchies,
    isCostingEnabled,
    types,
    typeSets,
    handlePinOptionTypeChange,
    selectedPinOptionTypes,
    handlePinOptionSetChange,
    selectedPinOptionSets,
    handlePinOptionDocumentsTypesChange,
    selectedPinOptionDocumentsTypes,
    handlePinOptionDocumentsSetsChange,
    selectedPinOptionDocumentsSets,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container">
                <div className="size-lg-12">
                    <div className="size-lg-6 size-md-12">
                        <Field name="Site name" required>
                            <TextInputContainer
                                name="name"
                                value={name}
                                handleChange={handleInputChange}
                                required
                            />
                        </Field>

                        <Field name="Client name">
                            <TextInputContainer
                                value={client}
                                name="client"
                                handleChange={handleInputChange}
                            />
                        </Field>

                        <Field name="Address line 1" required>
                            <TextInputContainer
                                value={addressLine1}
                                name="addressLine1"
                                handleChange={handleInputChange}
                                required
                            />
                        </Field>

                        <Field name="Address line 2">
                            <TextInputContainer
                                value={addressLine2}
                                name="addressLine2"
                                handleChange={handleInputChange}
                            />
                        </Field>

                        <Field name="Postcode" required>
                            <TextInputContainer
                                value={postcode}
                                name="postcode"
                                handleChange={handleInputChange}
                                required
                            />
                        </Field>
                    </div>
                    <div className="size-lg-6 size-md-12">
                        {isUsingBolsterLabels && (
                            <BolsterLabelExample name={name} hierarchy="Site" />
                        )}
                    </div>

                    {isCostingEnabled &&
                        types.map(type => {
                            const sets = typeSets[type.id] ?? [];
                            const options = sets.map(set => ({
                                text: set.name,
                                value: set.id,
                            }));
                            const isTypeSetsSelected = selectedPinOptionTypes[type.id];
                            const isTypeDocumentsSelected =
                                selectedPinOptionDocumentsTypes[type.id];
                            const { hasDocuments } = type;

                            return (
                                <React.Fragment key={type.id}>
                                    <Field
                                        labelClasses="no-capitalise"
                                        name={`Set ${type.namePlural} for site?`}
                                    >
                                        <CheckboxContainer
                                            name={type.id}
                                            checked={selectedPinOptionTypes[type.id]}
                                            handleChange={handlePinOptionTypeChange}
                                            label={`Set ${type.namePlural} for site?`}
                                            labelClasses="no-capitalise"
                                        />
                                    </Field>
                                    {isTypeSetsSelected && (
                                        <Field name={type.namePlural}>
                                            <OptionsPodSetListContainer
                                                name={type.id}
                                                isNumberValues
                                                options={options}
                                                handleChange={handlePinOptionSetChange}
                                                selectedOptions={
                                                    selectedPinOptionSets[type.id] ?? []
                                                }
                                            />
                                        </Field>
                                    )}

                                    {hasDocuments && (
                                        <>
                                            <Field
                                                labelClasses="no-capitalise"
                                                name={`Set ${type.name} documents for site?`}
                                            >
                                                <CheckboxContainer
                                                    name={type.id}
                                                    checked={
                                                        selectedPinOptionDocumentsTypes[type.id]
                                                    }
                                                    handleChange={
                                                        handlePinOptionDocumentsTypesChange
                                                    }
                                                    label={`Set ${type.name} documents for site?`}
                                                    labelClasses="no-capitalise"
                                                />
                                            </Field>
                                            {isTypeDocumentsSelected && (
                                                <Field name={type.namePlural}>
                                                    <OptionsPodSetListContainer
                                                        name={type.id}
                                                        isNumberValues
                                                        options={options}
                                                        handleChange={
                                                            handlePinOptionDocumentsSetsChange
                                                        }
                                                        selectedOptions={
                                                            selectedPinOptionDocumentsSets[
                                                                type.id
                                                            ] ?? []
                                                        }
                                                    />
                                                </Field>
                                            )}
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                </div>
            </div>
        </div>

        <ButtonWrapper alignment="right" extraClasses="flex-modal-footer">
            <ActionButton source="secondary" text="Cancel" onClick={hideModal} />

            {isFetchingHierarchies ? (
                <ActionButton text="Please wait..." icon="fa fa-spinner fa-spin" disabled="true" />
            ) : (
                <ActionButton type="submit" text="Confirm" icon="check" />
            )}
        </ButtonWrapper>
    </Form>
);

export default AddSiteForm;
