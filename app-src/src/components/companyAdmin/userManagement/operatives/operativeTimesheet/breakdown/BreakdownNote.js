import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { FILE_STORAGE_URL } from 'config';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';

const BreakdownNote = ({ note }) => {
    const { comments, createdOn, imageS3Key } = note;

    return (
        <div className="breakdown-note">
            <DateTimeContainer date={new Date(createdOn)} datetime={DATE_TIME_IDS.TIME} />
            <p>{comments}</p>
            {imageS3Key && <img alt="uploaded" src={`${FILE_STORAGE_URL}/${imageS3Key}`} />}
        </div>
    );
};

export default BreakdownNote;
