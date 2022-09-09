import React from 'react';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import FieldOutput from 'components/shared/generic/fieldOutput/presentational/FieldOutput';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { FILE_STORAGE_URL } from 'config';

const TemplateDetails = ({
    template: { name, dateCreated, lastUpdated, pinImageS3Key },
    serviceIcon,
}) => (
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
        <FieldOutput title="Pin Icon" fieldClass="no-h-padding">
            {pinImageS3Key ? (
                <img src={`${FILE_STORAGE_URL}/${pinImageS3Key}`} />
            ) : serviceIcon ? (
                <>
                    <img src={`${FILE_STORAGE_URL}/${serviceIcon}`} />
                    <p>This icon is inherited from the service</p>
                </>
            ) : (
                <p>The template or service doesn't currently have a pin icon</p>
            )}
        </FieldOutput>
    </>
);

export default TemplateDetails;
