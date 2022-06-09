import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const useConvertDateTimeToCompanyTimeZone = date => {
    const companySettings = useSelector(selectCompanySettings);
    const timeZone = companySettings?.timeZone.id ?? 'Europe/London';
    const timeZoneFormat = moment.tz(timeZone).format('Z');

    const getFormattedDateTime = () => {
        if (!date) return moment().format();
        return moment(date).format(`YYYY-MM-DDTHH:mm:ss${timeZoneFormat}`);
    };

    const getTimeSetFromCompanyTimeZone = () => {
        if (!date) return moment().format();
        return moment(date).format('YYYY-MM-DDTHH:mm:ss+03:00');
    };

    const convertedDate = getFormattedDateTime();
    const originalDateSet = getTimeSetFromCompanyTimeZone();

    return { convertedDate, originalDateSet };
};

export default useConvertDateTimeToCompanyTimeZone;
