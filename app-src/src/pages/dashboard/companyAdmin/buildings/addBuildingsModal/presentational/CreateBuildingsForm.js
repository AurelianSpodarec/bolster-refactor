import React from 'react';
import Form from 'components_DEPRECATED/shared/generic/form/containers/Form';
import BuildingFormFieldsNoLabel from './BuildingFormFieldsNoLabel';
import ActionButton from 'components_DEPRECATED/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components_DEPRECATED/shared/generic/button/presentational/ButtonWrapper';
import FlexWrapper from 'components_DEPRECATED/shared/generic/flexWrapper/FlexWrapper';

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
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container size-lg-12">
                <div className="size-lg-12">
                    <BuildingFormFieldsNoLabel
                        buildings={buildings}
                        updateBuilding={updateBuilding}
                        removeBuilding={removeBuilding}
                        siteName={siteName}
                    />
                </div>
            </div>
        </div>

        <FlexWrapper justify="between" extraClasses="flex-modal-footer">
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
                <ActionButton
                    type="submit"
                    text={isFetchingHierarchies ? 'Please wait...' : 'Confirm'}
                    icon={isFetchingHierarchies ? 'spinner' : 'check'}
                    iconSpin={isFetchingHierarchies}
                    disabled={isFetchingHierarchies}
                />
            </ButtonWrapper>
        </FlexWrapper>
    </Form>
);

export default CreateBuildingsForm;
