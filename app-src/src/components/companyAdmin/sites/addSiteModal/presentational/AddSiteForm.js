import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from '../../../../shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from '../../../../shared/generic/form/containers/CheckboxListContainer';

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
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
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
            </div>

            <div className="size-lg-6 size-md-12">
                <Field name="Client name">
                    <TextInputContainer
                        value={client}
                        name="client"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Address line 1" required>
                    <TextInputContainer
                        value={addressLine1}
                        name="addressLine1"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>

            <div className="size-lg-6 size-md-12">
                <Field name="Address line 2">
                    <TextInputContainer
                        value={addressLine2}
                        name="addressLine2"
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field name="Postcode" required>
                    <TextInputContainer
                        value={postcode}
                        name="postcode"
                        handleChange={handleInputChange}
                        required
                    />
                </Field>
            </div>
        </div>
        {isCostingEnabled &&
            types.map(type => {
                const sets = typeSets[type.id] ?? [];
                const options = sets.map(set => ({
                    text: set.name,
                    value: set.id,
                }));
                const isSelected = selectedPinOptionTypes[type.id];
                return (
                    <>
                        <Field
                            labelClasses="no-capitalise"
                            name={`Set ${type.namePlural} for site?`}
                            key={type.id}
                        >
                            <CheckboxContainer
                                name={type.id}
                                checked={selectedPinOptionTypes[type.id]}
                                handleChange={handlePinOptionTypeChange}
                                label={`Set ${type.namePlural} for site?`}
                                labelClasses="no-capitalise"
                            />
                        </Field>
                        {isSelected && (
                            <Field name={type.namePlural}>
                                <CheckboxListContainer
                                    name={type.id}
                                    text=""
                                    isNumberValues
                                    handleChange={handlePinOptionSetChange}
                                    options={options}
                                    selectedOptions={selectedPinOptionSets[type.id] ?? []}
                                />
                            </Field>
                        )}
                    </>
                );
            })}
        {isUsingBolsterLabels && <BolsterLabelExample name={name} hierarchy="Site" />}

        <BlockButtonWrapper>
            {isFetchingHierarchies ? (
                <button className="button green disabled" disabled>
                    <i className="fa fa-spinner fa-spin"></i> Please wait...
                </button>
            ) : (
                <button className="button green">Submit</button>
            )}
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);
export default AddSiteForm;
