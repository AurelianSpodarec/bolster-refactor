import React from 'react';

import standardLabel from '_content/images/labels/standard.png';
import trimLabel from '_content/images/labels/trim.png';

import BlockHeading from '../../blockHeading/presentational/BlockHeading';
import LabelFieldExampleItemContainer from 'components/superAdmin/templateBuilder/templateBuilder/containers/LabelFieldExampleItemContainer';
import { LABEL_TYPES_NUMS } from 'constants/companyAdmin/enums';

const BolsterLabelFieldsExample = ({ fields, template }) => (
    <div className="size-lg-12 label-example template-builder-example">
        <BlockHeading title="Label example" />
        {+template.labelType === LABEL_TYPES_NUMS.STANDARD && (
            <div className="label-example-container size-lg-12">
                <div className="label-example size-lg-12">
                    <img alt="example label standard" src={standardLabel} />
                    {/* {fields} */}
                    <div className="field-holder">
                        {[...fields]
                            .sort((a, b) => a.key - b.key)
                            .map(field => (
                                <LabelFieldExampleItemContainer
                                    key={field.uuid}
                                    field={field}
                                />
                            ))}
                    </div>
                </div>
            </div>
        )}
        {+template.labelType === LABEL_TYPES_NUMS.TRIM && (
            <div className="label-example-container small size-lg-12">
                <div className="label-example size-lg-12">
                    <img alt="example label small" src={trimLabel} />
                    <div className="field-holder">
                        {fields.map(field => (
                            <LabelFieldExampleItemContainer
                                key={field.uuid}
                                field={field}
                            />
                        ))}
                    </div>{' '}
                </div>
            </div>
        )}
    </div>
);

export default BolsterLabelFieldsExample;
