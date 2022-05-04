import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { DATE_TIMES, DATE_TIME_IDS, DATE_TIME_DEFAULTS } from 'constants/companyAdmin/enums';

const DateTimeContainer = ({ date, timeZone, dateFormat, className = '' }) => {
    const formattedDate = moment.utc(date).tz(timeZone).format(dateFormat);
    return <span className={className}>{formattedDate}</span>;
};

export const mapStateToProps = (
    {
        companyAdmin: {
            companySettingsReducer: {
                companySettings: { timeZone = {}, dateFormat = {} },
            },
        },
    },
    { datetime = DATE_TIME_IDS.DATETIME },
) => ({
    timeZone: timeZone.id || 'Europe/London',
    dateFormat: dateFormat[DATE_TIMES[datetime]] || DATE_TIME_DEFAULTS[datetime],
});

export default connect(mapStateToProps)(DateTimeContainer);
