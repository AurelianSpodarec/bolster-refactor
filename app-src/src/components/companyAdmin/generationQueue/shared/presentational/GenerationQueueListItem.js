import React from 'react';

import { RAW_S3_STORAGE_URL_REPORTS } from 'config';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    GENERATION_STATE_VAL,
    REPORT_FORMATS
} from 'constants/companyAdmin/enums';

const GenerationQueueListItem = ({ queueItem }) => (
    <tr>
        <td>{queueItem.friendlyName}</td>
        <td>{REPORT_FORMATS[queueItem.type]}</td>
        <td>{!!queueItem.stateMessage && queueItem.stateMessage}</td>
        <td>{GENERATION_STATE_TEXT[queueItem.state]}</td>
        <td>
            <DateTimeContainer date={queueItem.createdOn} />
        </td>
        <td>
            {queueItem.state === GENERATION_STATE_VAL.COMPLETE ? (
                <a
                    className="button green"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`${RAW_S3_STORAGE_URL_REPORTS}/${queueItem.s3Key}`}
                >
                    <i className="fa fa-download" /> Download File
                </a>
            ) : (
                <button className="button disabled">Unavailable</button>
            )}
        </td>
    </tr>
);

export default GenerationQueueListItem;
