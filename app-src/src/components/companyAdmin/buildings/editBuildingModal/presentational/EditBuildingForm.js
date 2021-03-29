import React from 'react';

import EditBuildingFormFieldsNoLabel from 'components/companyAdmin/buildings/editBuildingModal/presentational/EditBuildingFormFieldsNoLabel';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import Form from 'components/shared/generic/form/containers/Form';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const BuildingEditForm = ({
    handleSubmit,
    handleInputChange,
    handleDateChange,
    hideModal,
    name,
    location,
    isAlertShowing,
    message,
    dateToSend,
    isManufacturingInherited,
    setManufacturersForHierarchy,
    manufacturerOptions,
    selectedManufacturerOptions,
    selectedOptionValues,
    optionValuesOptions,
    handleShowManufacturingOptions,
    showManufacturingOptions,
    manufacturingInheritedFrom,
    showDropdownOptions,
    setDropdownOptionsForHierarchy,
    isDropdownOptionsInherited,
    selectedDropdownOptions,
    dropdownOptions,
    isDropDownOptionsInheritedFrom,
    handleShowDropdownOptions,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <EditBuildingFormFieldsNoLabel
            handleInputChange={handleInputChange}
            handleDateChange={handleDateChange}
            name={name}
            location={location}
            isAlertShowing={isAlertShowing}
            message={message}
            dateToSend={dateToSend}
            isManufacturingInherited={isManufacturingInherited}
            setManufacturersForHierarchy={setManufacturersForHierarchy}
            manufacturerOptions={manufacturerOptions}
            selectedManufacturerOptions={selectedManufacturerOptions}
            selectedOptionValues={selectedOptionValues}
            optionValuesOptions={optionValuesOptions}
            handleShowManufacturingOptions={handleShowManufacturingOptions}
            showManufacturingOptions={showManufacturingOptions}
            manufacturingInheritedFrom={manufacturingInheritedFrom}
            showDropdownOptions={showDropdownOptions}
            setDropdownOptionsForHierarchy={setDropdownOptionsForHierarchy}
            isDropdownOptionsInherited={isDropdownOptionsInherited}
            selectedDropdownOptions={selectedDropdownOptions}
            dropdownOptions={dropdownOptions}
            isDropDownOptionsInheritedFrom={isDropDownOptionsInheritedFrom}
            handleShowDropdownOptions={handleShowDropdownOptions}
        />

        <BlockButtonWrapper>
            <button className="button green">Confirm</button>
            <ButtonContainer handleClick={hideModal}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default BuildingEditForm;
