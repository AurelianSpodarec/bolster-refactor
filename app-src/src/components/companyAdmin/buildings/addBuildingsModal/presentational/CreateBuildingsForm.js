import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BuildingFormFieldsWithLabel from './BuildingFormFieldsWithLabel';
import BuildingFormFieldsNoLabel from './BuildingFormFieldsNoLabel';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateBuildingsForm = ({
    handleSubmit,
    buildings,
    updateBuilding,
    addBuilding,
    removeBuilding,
    handleClose,
    isUsingBolsterLabels
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            {isUsingBolsterLabels ? (
                <BuildingFormFieldsWithLabel
                    buildings={buildings}
                    updateBuilding={updateBuilding}
                    removeBuilding={removeBuilding}
                />
            ) : (
                <BuildingFormFieldsNoLabel
                    buildings={buildings}
                    updateBuilding={updateBuilding}
                    removeBuilding={removeBuilding}
                />
            )}
        </div>
        <BlockButtonWrapper>
            <button
                className="button green"
                type="button"
                onClick={addBuilding}
            >
                <i className="fa fa-plus" /> Add another building
            </button>
            <button className="button green" type="submit">
                <i className="fa fa-plus" /> Save Buildings
            </button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateBuildingsForm;
