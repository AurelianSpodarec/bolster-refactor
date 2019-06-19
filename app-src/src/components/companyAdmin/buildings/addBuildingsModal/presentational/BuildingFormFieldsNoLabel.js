import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const BuildingFormFieldsNoLabel = ({
    buildings,
    updateBuilding,
    removeBuilding
}) =>
    buildings.map(building => (
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
    ));

export default BuildingFormFieldsNoLabel;
