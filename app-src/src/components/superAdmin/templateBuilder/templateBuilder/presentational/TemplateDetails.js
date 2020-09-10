import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const TemplateDetails = ({ template: { name, dateCreated, lastUpdated } }) => (
    <>
        <BlockHeading title="Template Details" />
        <FieldOutput title="Name" description={name} fieldClass="no-h-padding" />
        <FieldOutput
            title="Date created"
            description={dateCreated ? <DateTimeContainer date={dateCreated} /> : '--'}
            fieldClass="no-h-padding"
        />
        <FieldOutput
            title="Last updated"
            description={lastUpdated ? <DateTimeContainer date={lastUpdated} /> : '--'}
            fieldClass="no-h-padding"
        />
    </>
);

export default TemplateDetails;
