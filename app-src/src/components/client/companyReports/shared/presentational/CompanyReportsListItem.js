import React from 'react';

import { RAW_S3_STORAGE_URL } from 'config';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    GENERATION_STATE_VAL
} from 'constants/companyAdmin/enums';

const CompanyReportsListItem = ({ queueItem }) => (
    <tr>
        <td>{queueItem.friendlyName}</td>
        <td>
            {queueItem.isCSVGeneration && 'CSV'}
            {queueItem.isCSVGeneration &&
                queueItem.isFloorplanGeneration &&
                ', '}
            {queueItem.isCSVGeneration && queueItem.isPDFGeneration && ', '}
            {queueItem.isFloorplanGeneration && 'Floor plan'}
            {queueItem.isFloorplanGeneration &&
                queueItem.isPDFGeneration &&
                ', '}

            {queueItem.isPDFGeneration && 'PDF'}
        </td>{' '}
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
                    href={`${RAW_S3_STORAGE_URL}/${queueItem.s3Key}`}
                >
                    <i className="fa fa-download" /> Download File
                </a>
            ) : (
                <button className="button disabled">Generating...</button>
            )}
        </td>
    </tr>
);

export default CompanyReportsListItem;
