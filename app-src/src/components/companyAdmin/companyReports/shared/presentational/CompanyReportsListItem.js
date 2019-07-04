import React from 'react';

import { RAW_S3_STORAGE_URL } from 'config';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    GENERATION_STATE_VAL
} from 'constants/companyAdmin/enums';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const CompanyReportsListItem = ({ queueItem, onMobile, headers }) => {
    const typeArr = [];
    if (queueItem.isCSVGeneration) typeArr.push('CSV');
    if (queueItem.isPDFGeneration) typeArr.push('PDF');
    if (queueItem.isFloorplanGeneration) typeArr.push('Floor plan');
    return (
        <tr>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[0]}</span>
                )}
                {queueItem.friendlyName}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[1]}</span>
                )}
                {typeArr.join(', ')}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                {GENERATION_STATE_TEXT[queueItem.state]}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[3]}</span>
                )}
                <DateTimeContainer date={queueItem.createdOn} />
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[4]}</span>
                )}
                {queueItem.completedOn ? (
                    <DateTimeContainer date={queueItem.completedOn} />
                ) : (
                    'N/A'
                )}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[5]}</span>
                )}
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
                    <button className="button disabled">
                        <LoadingIcon />
                        Generating...
                    </button>
                )}
            </td>
        </tr>
    );
};

export default CompanyReportsListItem;
