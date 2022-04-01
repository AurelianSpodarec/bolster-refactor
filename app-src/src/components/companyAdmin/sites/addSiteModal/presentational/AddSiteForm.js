import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';
import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';
import CheckboxListContainer from 'components/shared/generic/form/containers/CheckboxListContainer';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

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
    setManufacturersForSite,
    selectedManufacturerOptions,
    manufacturerOptions,
    optionValuesOptions,
    selectedOptionValues,
    setDropDownOptions,
    selectedDropDownOptions,
    dropdownOptions,
    isFetchingHierarchies,
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
        {isUsingBolsterLabels && <BolsterLabelExample name={name} hierarchy="Site" />}
        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field labelClasses="no-capitalise" name="Set manufacturer(s) for site?">
                    <CheckboxContainer
                        checked={setManufacturersForSite}
                        name="setManufacturersForSite"
                        text=""
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>
        {setManufacturersForSite && (
            <div className="size-lg-12">
                <Field
                    labelClasses="no-capitalise"
                    name="Manufacturer(s)"
                    required={setManufacturersForSite}
                >
                    <CheckboxListContainer
                        name="selectedManufacturerOptions"
                        text=""
                        handleChange={handleInputChange}
                        selectedOptions={selectedManufacturerOptions}
                        options={manufacturerOptions}
                        required={setManufacturersForSite}
                    />
                </Field>
            </div>
        )}

        {setManufacturersForSite &&
            Object.entries(optionValuesOptions).map(([manufacturerID, optionValues]) => {
                if (selectedManufacturerOptions.includes(manufacturerID)) {
                    const manufacturerInfo = manufacturerOptions.find(
                        element => String(element.id) === String(manufacturerID),
                    );

                    return (
                        <div className="size-lg-12">
                            <Field
                                labelClasses="no-capitalise"
                                name={`${manufacturerInfo.name} ${
                                    DROPDOWN_OPTIONS[manufacturerInfo.pinOptionType].name
                                }
                              `}
                                required
                            >
                                <CheckboxListContainer
                                    name="selectedOptionValues"
                                    text=""
                                    handleChange={handleInputChange}
                                    selectedOptions={selectedOptionValues}
                                    options={Object.values(optionValues)}
                                    required
                                />
                            </Field>
                        </div>
                    );
                } else return null;
            })}

        <div className="size-lg-12">
            <div className="size-lg-6 size-md-12">
                <Field labelClasses="no-capitalise" name="Set item types for site?">
                    <CheckboxContainer
                        checked={setDropDownOptions}
                        name="setDropDownOptions"
                        text=""
                        handleChange={handleInputChange}
                    />
                </Field>
            </div>
        </div>
        {setDropDownOptions && (
            <div className="size-lg-12">
                <Field labelClasses="no-capitalise" name="Item Types" required={setDropDownOptions}>
                    <CheckboxListContainer
                        name="selectedDropDownOptions"
                        text=""
                        handleChange={handleInputChange}
                        selectedOptions={selectedDropDownOptions}
                        options={dropdownOptions}
                    />
                </Field>
            </div>
        )}

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
