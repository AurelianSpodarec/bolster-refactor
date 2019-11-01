import React from 'react';
import moment from 'moment';

import { RAW_S3_STORAGE_URL } from 'config';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    GENERATION_STATE_VAL
} from 'constants/companyAdmin/enums';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const CompanyReportsListItem = ({
    queueItem,
    onMobile,
    headers,
    retryCompanyReport,
    shouldDeleteReportsAfterDownload,
    handleDeleteAfterDownload
}) => {
    const typeArr = [];
    if (queueItem.isCSVGeneration) typeArr.push('CSV');
    if (queueItem.isPDFGeneration) typeArr.push('PDF');
    if (queueItem.isFloorplanGeneration) typeArr.push('Floor plan');

    const { COMPLETE, FAILED, DELETED } = GENERATION_STATE_VAL;

    const isRetryAvailable =
        queueItem.state === FAILED ||
        (queueItem.state !== COMPLETE &&
            moment(queueItem.createdOn) > moment().add(-1, 'hours'));

    
    const DownloadLink = shouldDeleteReportsAfterDownload ?
        <button
            className="button green"
            onClick={() => handleDeleteAfterDownload(queueItem)}
        >
            Download Report
        </button>
         : 

        <a
            className="button green"
            target="_blank"
            rel="noopener noreferrer"
            href={`${RAW_S3_STORAGE_URL}/${queueItem.s3Key}`}
        >
            <i className="fa fa-download" /> Download File
        </a>;

    return (
        <tr>
            <td>
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
                {queueItem.createdByUserName}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[2]}</span>
                )}
                {typeArr.join(', ')}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[3]}</span>
                )}
                {GENERATION_STATE_TEXT[queueItem.state]}
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[4]}</span>
                )}
                <DateTimeContainer date={queueItem.createdOn} />
            </td>
            <td>
                {' '}
                {onMobile && (
                    <span className="mobile-table-heading">{headers[5]}</span>
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
                    <span className="mobile-table-heading">{headers[6]}</span>
                )}
                {queueItem.state === COMPLETE ? (
                    DownloadLink
                ) : queueItem.state === FAILED ? (
                    // (
                    //     <button className="button green" onClick={() => {}}>
                    //         <i className="fa fa-envelope" /> Report will be e-mailed
                    //     </button>
                    // ) :
                    <button
                        className="button red"
                        onClick={() => retryCompanyReport(queueItem.id)}
                    >
                        <i className="fa fa-times" /> Failed - Retry?
                    </button>
                )
                 : queueItem.state === DELETED ? 
                    (
                    <button className="button red"
                    onClick={() => {}}
                    >
                        <i className="fa fa-times" /> Report deleted.
                    </button>
                ) : isRetryAvailable ? (
                    <button
                        className="button"
                        onClick={() => retryCompanyReport(queueItem.id)}
                    >
                        <LoadingIcon />
                        Generating... (retry?)
                    </button>
                )
                : (
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
