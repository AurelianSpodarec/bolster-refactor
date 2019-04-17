import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { DATE_TIMES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const DateTimeContainer = ({ date, timeZone, dateFormat, className = '' }) => (
    <Moment
        tz={timeZone}
        format={dateFormat}
        date={date}
        className={className}
    />
);

export const mapStateToProps = (
    {
        companyAdmin: {
            companySettingsReducer: {
                companySettings: { timeZone = {}, dateFormat = {} }
            }
        }
    },
    { datetime = DATE_TIME_IDS.DATETIME }
) => ({
    timeZone: timeZone.id || 'Europe/London',
    dateFormat: dateFormat[DATE_TIMES[datetime]]
});

export default connect(mapStateToProps)(DateTimeContainer);
