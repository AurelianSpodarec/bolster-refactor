import React from 'react';
import moment from 'moment';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const FeatureSingleDetails = ({
    feature: { title, shortDescription, fullDescription, publishDate },
}) => (
    <>
        <BlockHeading title="New Feature" />
        <div className="field-group size-lg-12">
            <div className="field-output size-lg-4">
                {!!title && (
                    <FieldOutput title="Title" description={title} fieldClass="no-h-padding" />
                )}
            </div>
            <div className="field-output size-lg-4">
                {!!publishDate && (
                    <FieldOutput
                        title="Publish Date"
                        description={moment(publishDate).format('DD-MM-YYYY HH:mm')}
                        fieldClass="no-h-padding"
                    />
                )}
            </div>
            <div className="field-output">
                {!!shortDescription && (
                    <FieldOutput
                        title="Short Description"
                        description={shortDescription}
                        fieldClass="no-h-padding"
                    />
                )}

                {!!fullDescription && (
                    <FieldOutput
                        title="Full Description"
                        description={fullDescription}
                        fieldClass="no-h-padding"
                    />
                )}
            </div>
        </div>
    </>
);

export default FeatureSingleDetails;
