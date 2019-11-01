import React from 'react';

import { RAW_S3_STORAGE_URL, REPORT_VIEWER_URL } from 'config';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

import {
    GENERATION_STATE_TEXT,
    GENERATION_STATE_VAL
} from 'constants/companyAdmin/enums';

const CompanyReportsListItem = ({ 
    queueItem,
    // retryCompanyReport
    }) => {
    const { FAILED, COMPLETE, DELETED } = GENERATION_STATE_VAL;

    return (
        <tr>
            <td>{queueItem.companyName}</td>
            <td>{queueItem.friendlyName}</td>
            <td>{queueItem.createdByUserName}</td>
            <td>{queueItem.userEmail}</td>

            <td>{GENERATION_STATE_TEXT[queueItem.state]}</td>
            <td>
                <DateTimeContainer date={queueItem.createdOn} />
            </td>
            <td>
                {queueItem.completedOn ? (
                    <DateTimeContainer date={queueItem.completedOn} />
                ) : (
                    'N/A'
                )}
            </td>
            <td>
                {queueItem.state === COMPLETE ? (
                    <a
                        className="button green"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${RAW_S3_STORAGE_URL}/${queueItem.s3Key}`}
                    >
                        <i className="fa fa-download" /> Download File
                    </a>
                ) : queueItem.state === FAILED ? (
                    // (
                    //     <button
                    //         className="button red"
                    //         onClick={() => retryCompanyReport(queueItem.id)}
                    //     >
                    //         <i className="fa fa-times" /> Failed - Retry?
                    //     </button>
                    // )
                    <a
                        href={`${REPORT_VIEWER_URL}/${
                            queueItem.id
                        }?page=1&drawingsPerPage=100`}
                    >
                        <button className="button red" type="button">
                            <i className="fa fa-times" />
                            Failed - View report
                        </button>
                    </a>
                ) : queueItem.state === DELETED ? 
                (
                    <button className="button red disabled">Report deleted</button>
                )
                : (
                    <button className="button disabled">Unavailable</button>
                )}
            </td>
        </tr>
    );
};

export default CompanyReportsListItem;
