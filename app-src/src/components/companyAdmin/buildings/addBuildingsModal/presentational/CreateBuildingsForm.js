import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BuildingFormFieldsNoLabel from './BuildingFormFieldsNoLabel';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateBuildingsForm = ({
    handleSubmit,
    buildings,
    updateBuilding,
    addBuilding,
    removeBuilding,
    handleClose,
    initialOptions,
    showManufacturingOptions,
    setShowManufacturingOptions,
    siteName,
    showDropdownOptions,
    setShowDropdownOptions,
    initialDropdownOptions,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <BuildingFormFieldsNoLabel
                buildings={buildings}
                updateBuilding={updateBuilding}
                removeBuilding={removeBuilding}
                showManufacturingOptions={showManufacturingOptions}
                setShowManufacturingOptions={setShowManufacturingOptions}
                siteName={siteName}
                showDropdownOptions={showDropdownOptions}
                setShowDropdownOptions={setShowDropdownOptions}
                initialDropdownOptions={initialDropdownOptions}
            />
        </div>
        <BlockButtonWrapper>
            <button
                className="button blue left"
                type="button"
                onClick={() => addBuilding(initialOptions)}
            >
                <i className="fa fa-plus" /> Add another building
            </button>
            <button className="button green" type="submit">
                <i className="fa fa-plus" /> Submit
            </button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateBuildingsForm;
