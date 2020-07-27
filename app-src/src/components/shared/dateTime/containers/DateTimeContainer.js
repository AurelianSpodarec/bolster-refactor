import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { DATE_TIMES, DATE_TIME_IDS, DATE_TIME_DEFAULTS } from 'constants/companyAdmin/enums';

const DateTimeContainer = ({ date, timeZone, dateFormat, className = '' }) => {
    let dateTime = moment(date).tz(timeZone);
    if (dateTime.isDST()) {
        console.error('hi');
    } else {
        console.error('ho');
    }
    return (
        <Moment tz={timeZone} format={dateFormat} date={date + '+00:00'} className={className} />
    );
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
