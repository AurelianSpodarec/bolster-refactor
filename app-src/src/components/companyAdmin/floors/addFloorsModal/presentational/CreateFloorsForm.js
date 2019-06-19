import React from 'react';
import Form from 'components/shared/generic/form/containers/Form';
import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

// * .*. in names is used for splitting up field validations without risking overlap with real names

const CreateFloorsForm = ({
    handleSubmit,
    floors,
    updateFloor,
    addFloor,
    removeFloor,
    handleClose
}) => (
    <Form onSubmit={handleSubmit} className="generic-form size-lg-12">
        <div className="size-lg-12">
            {floors.map((floor, i) => (
                <>
                    <div className="size-lg-6" key={floor.id}>
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
                            <button
                                className="button red icon-only"
                                type="button"
                                onClick={() => removeFloor(floor.id)}
                            >
                                <i className="fa fa-trash" />
                            </button>
                        </BlockButtonWrapper>
                    )}
                </>
            ))}
        </div>
        <BlockButtonWrapper>
            <button className="button green" type="button" onClick={addFloor}>
                <i className="fa fa-plus" /> Add another floor
            </button>
            <button className="button green" type="submit">
                <i className="fa fa-plus" /> Save Floor
                {floors.length > 1 ? 's' : ''}
            </button>
            <ButtonContainer handleClick={handleClose}>Cancel</ButtonContainer>
        </BlockButtonWrapper>
    </Form>
);

export default CreateFloorsForm;
