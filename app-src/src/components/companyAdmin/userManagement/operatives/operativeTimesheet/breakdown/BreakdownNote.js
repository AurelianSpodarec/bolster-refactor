import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import React from 'react';

const BreakdownNote = ({ note }) => {
    const { text, timestamp, img } = note;

    return (
        <div className="breakdown-note">
            <DateTimeContainer date={new Date(timestamp)} datetime={DATE_TIME_IDS.TIME} />
            <p>{text}</p>
            {img && <img src={img} alt="Uploaded" />}
        </div>
    );
};

export default BreakdownNote;
