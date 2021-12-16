import moment from 'moment';
import { useSelector } from 'react-redux';

import { DATE_TIMES, DATE_TIME_DEFAULTS, DATE_TIME_IDS } from 'constants/companyAdmin/enums';

const useDateTime = (date, dateTime = DATE_TIME_IDS.DATETIME) => {
    const { timeZone, dateFormat } = useSelector(state => mapStateToProps(state, { dateTime }));
    const time = moment(date).tz(timeZone);
    const formatted = time.format(dateFormat);
    return { moment: time, formatted };
};

const mapStateToProps = (
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
export default useDateTime;
