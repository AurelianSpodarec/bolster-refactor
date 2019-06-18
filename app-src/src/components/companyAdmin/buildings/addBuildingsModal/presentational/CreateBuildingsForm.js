import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const CreateBuildingsForm = ({
    handleSubmit,
    buildings,
    updateBuilding,
    addBuilding,
    removeBuilding,
    handleClose
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            {buildings.map(building => (
                <>
                    <div className="size-lg-6" key={building.id}>
                        <Field name="Building name" required>
                            <TextInputContainer
                                name="name"
                                value={building.name}
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                                required
                            />
                        </Field>
                    </div>
                    <div className="size-lg-6">
                        <Field name="Location">
                            <TextInputContainer
                                value={building.location}
                                name="location"
                                handleChange={(name, value) =>
                                    updateBuilding(name, value, building.id)
                                }
                            />
                        </Field>
                        {buildings.length > 1 && (
                            <BlockButtonWrapper>
                                <button
                                    className="button red icon-only"
                                    type="button"
                                    onClick={() => removeBuilding(building.id)}
                                >
                                    <i className="fa fa-trash" />
                                </button>
                            </BlockButtonWrapper>
                        )}
                    </div>
                </>
            ))}
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
