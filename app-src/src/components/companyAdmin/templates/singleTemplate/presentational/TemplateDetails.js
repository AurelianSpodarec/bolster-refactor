import React from 'react';
import moment from 'moment';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';

const TemplateDetails = ({ template }) => (
    <>
        <BlockHeading title="Template Details" />
        <FieldOutput title="Name" description={template.name} fieldClass="no-h-padding" />
        <FieldOutput
            title="Date created"
            description={`##${moment().format('DD/MM/YYYY HH:mm')}##`}
            fieldClass="no-h-padding"
        />
        <FieldOutput
            title="Last updated"
            description={`##${moment().format('DD/MM/YYYY HH:mm')}##`}
            fieldClass="no-h-padding"
        />
    </>
);

export default TemplateDetails;
