import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import BuildingFormFieldsNoLabel from './BuildingFormFieldsNoLabel';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateBuildingsForm = ({
    handleSubmit,
    buildings,
    updateBuilding,
    addBuilding,
    removeBuilding,
    handleClose,
    siteName,
    isFetchingHierarchies,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            <BuildingFormFieldsNoLabel
                buildings={buildings}
                updateBuilding={updateBuilding}
                removeBuilding={removeBuilding}
                siteName={siteName}
            />
        </div>
        <FlexWrapper justify="between">
            <ActionButton
                type="button"
                text="Add another building"
                icon="plus"
                onClick={addBuilding}
                ambient="positive"
                extraClasses="margin-left"
            />

            <ButtonWrapper>
                <ActionButton source="secondary" text="Cancel" onClick={handleClose} />
                {isFetchingHierarchies ? (
                    <ActionButton
                        text="Please wait..."
                        icon="fa fa-spinner fa-spin"
                        disabled="true"
                    />
                ) : (
                    <ActionButton type="submit" text="Confirm" icon="check" />
                )}
            </ButtonWrapper>
        </FlexWrapper>
    </Form>
);

export default CreateBuildingsForm;
