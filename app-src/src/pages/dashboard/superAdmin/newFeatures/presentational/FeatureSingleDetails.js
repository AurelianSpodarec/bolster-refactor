import React from 'react';
import moment from 'moment';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const FeatureSingleDetails = ({ feature: { title, fullDescription, publishDate } }) => (
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
                    <FieldOutput title="Publish Date" fieldClass="no-h-padding">
                        <p>
                            <DateTimeContainer
                                date={moment.utc(publishDate).format('YYYY-MM-DDTHH:mm:ss')}
                            />
                        </p>
                    </FieldOutput>
                )}
            </div>
            <div className="field-output">
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
