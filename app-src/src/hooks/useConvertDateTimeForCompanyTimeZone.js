import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const useConvertDateTimeForCompanyTimeZone = date => {
    const companySettings = useSelector(selectCompanySettings);
    const timeZone = companySettings?.timeZone.id ?? 'Europe/London';
    const timeZoneFormat = moment.tz(timeZone).format('Z');

    const getTimeZoneDateFromLocalDate = () => {
        if (!date) return moment().format();
        return moment(date).format(`YYYY-MM-DDTHH:mm:ss${timeZoneFormat}`);
    };

    const getTimeZoneDateFromUtcDate = () => {
        if (!date) return moment().format();

        const timeZoneFormatSymbol = timeZoneFormat.charAt(0);
        const timeZoneFormatTime = timeZoneFormat.substring(1);

        const switchedTimeZone = `${timeZoneFormatSymbol === '+' ? '-' : '+'}${timeZoneFormatTime}`;

        return moment(date).format(`YYYY-MM-DDTHH:mm:ss${switchedTimeZone}`);
    };

    const dateFromLocalToTimeZone = getTimeZoneDateFromLocalDate();
    const dateFromUtcToTimeZone = getTimeZoneDateFromUtcDate();

    return { dateFromLocalToTimeZone, dateFromUtcToTimeZone };
};

export default useConvertDateTimeForCompanyTimeZone;
