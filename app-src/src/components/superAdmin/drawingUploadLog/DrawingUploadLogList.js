import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { RAW_S3_STORAGE_URL } from 'config';

const DrawingUploadLogList = ({ drawingsLogs }) =>
    drawingsLogs.map(drawingsLog => (
        <tr key={drawingsLog.id}>
            <td>{drawingsLog.companyName}</td>
            <td>{drawingsLog.fullHierarchyName}</td>
            <td>
                {' '}
                <DateTimeContainer date={drawingsLog.createdOn} />
            </td>
            <td>{drawingsLog.createdByCompanyUserName}</td>
            <td>{drawingsLog.originalFileExtension}</td>
            <td>
                {!drawingsLog.originalFileHeight && !drawingsLog.originalFileWidth && 'Unknown'}
                {drawingsLog.originalFileHeight && 'H: ' + drawingsLog.originalFileHeight}
                {drawingsLog.originalFileWidth && ' W: ' + drawingsLog.originalFileWidth}
            </td>
            <td style={{ textAlign: 'center' }}>
                {drawingsLog.originalFileS3Key && (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${RAW_S3_STORAGE_URL}/${drawingsLog.originalFileS3Key}`}
                        className="links"
                        download={true}
                    >
                        <i className="fa fa-download" />
                    </a>
                )}
            </td>
        </tr>
    ));
export default DrawingUploadLogList;
