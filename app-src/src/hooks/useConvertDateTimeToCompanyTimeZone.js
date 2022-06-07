import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';

import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const useConvertDateTimeToCompanyTimeZone = date => {
    const companySettings = useSelector(selectCompanySettings);

    const getFormattedDateTime = () => {
        if (!date) return moment().format();

        const timeZone = companySettings?.timeZone.id ?? 'Europe/London';
        const timeZoneFormat = moment.tz(timeZone).format('Z');

        return moment(date).format(`YYYY-MM-DDTHH:mm:ss${timeZoneFormat}`);
    };

    const converted = getFormattedDateTime();

    return converted;
};

export default useConvertDateTimeToCompanyTimeZone;
