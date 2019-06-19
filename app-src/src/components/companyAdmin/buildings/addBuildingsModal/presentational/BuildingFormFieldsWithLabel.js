import React from 'react';

import Field from 'components/shared/generic/form/presentational/Field';
import TextInputContainer from 'components/shared/generic/form/containers/TextInputContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import BolsterLabelExample from 'components/shared/generic/form/presentational/BolsterLabelExample';

const BuildingFormFieldsWithLabel = ({
    buildings,
    updateBuilding,
    removeBuilding
}) =>
    buildings.map(building => (
        <div key={building.id} className="size-lg-12">
            <div className="size-lg-6">
                <div className="size-lg-12">
                    <Field name="Building name" required>
                        <TextInputContainer
                            name={`${building.id}.*.name`}
                            value={building.name}
                            handleChange={(name, value) =>
                                updateBuilding(name, value, building.id)
                            }
                            required
                        />
                    </Field>
                </div>
                <div className="size-lg-12">
                    <Field name="Location">
                        <TextInputContainer
                            value={building.location}
                            name={`${building.id}.*.location`}
                            handleChange={(name, value) =>
                                updateBuilding(name, value, building.id)
                            }
                        />
                    </Field>
                </div>
            </div>
            <div className="size-lg-6">
                <BolsterLabelExample name={building.name} />
            </div>
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
    ));

export default BuildingFormFieldsWithLabel;
