import React from 'react';

import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import FlexWrapper from 'components/shared/generic/flexWrapper/FlexWrapper';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';
import ButtonWrapper from 'components/shared/generic/button/presentational/ButtonWrapper';
import { ReactComponent as TrashIcon } from '../../../../../assets/images/icons/trash.svg';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateFloorsForm = ({
    handleSubmit,
    floors,
    updateFloor,
    addFloor,
    removeFloor,
    handleClose,
    isUsingBolsterLabels,
    isFetchingHierarchies,
}) => (
    <Form onSubmit={handleSubmit} className="generic-form flex-content-wrapper size-lg-12">
        <div className="flex-content">
            <div className="form-fields-container size-lg-12">
                <div className="size-lg-12">
                    {floors.map(floor => (
                        <>
                            <div
                                className={`size-lg-${
                                    isUsingBolsterLabels ? '6' : '12'
                                } size-md-12`}
                                key={floor.id}
                            >
                                <Field name="Floor name" required>
                                    <TextInputContainer
                                        name={`${floor.id}.*.name`}
                                        value={floor.name}
                                        handleChange={(name, value) =>
                                            updateFloor(name, value, floor.id)
                                        }
                                        required
                                    />
                                </Field>
                            </div>

                            {floors.length > 1 && (
                                <BlockButtonWrapper>
                                    <ActionButton
                                        type="button"
                                        svgIconComponent={TrashIcon}
                                        onClick={() => removeFloor(floor.id)}
                                        ambient="positive"
                                        source="secondary"
                                        iconOnly
                                    />
                                </BlockButtonWrapper>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>

        <FlexWrapper justify="between" extraClasses="flex-modal-footer">
            <ActionButton
                type="button"
                text="Add another floor"
                icon="plus"
                onClick={addFloor}
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

export default CreateFloorsForm;
