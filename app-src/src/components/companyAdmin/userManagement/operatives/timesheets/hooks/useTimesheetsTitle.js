import { TIME_PERIOD } from 'constants/companyAdmin/enums';
import { useQuery } from 'helpers/hooks';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectTimesheetsIsFetching,
    timesheetSelectedCompanyIDs,
} from 'selectors/companyAdmin/timesheets';
import { selectJobReferencesIsFetching } from 'selectors/companyAdmin/jobReferences';
import { selectCompanyUsersIsFetching } from 'selectors/companyAdmin/companyUsers';
import { selectCompanySettings } from 'selectors/companyAdmin/companySettings';

const useTimesheetsTitle = () => {
    const companyUsersIsFetching = useSelector(selectCompanyUsersIsFetching);
    const timesheetsIsFetching = useSelector(selectTimesheetsIsFetching);
    const jobReferencesIsFetching = useSelector(selectJobReferencesIsFetching);
    const isFetching = timesheetsIsFetching || companyUsersIsFetching || jobReferencesIsFetching;
    const companyUserIDs = useSelector(timesheetSelectedCompanyIDs);
    const { timeZone } = useSelector(selectCompanySettings);

    const query = useQuery();
    const initialDate = query.get('date') || new Date();

    const [titleData, setTitleData] = useState({
        date: moment(initialDate)
            .tz(timeZone?.id ?? 'Europe/London')
            .startOf('day')
            .format(),
        timePeriod: TIME_PERIOD.DAY,
    });
    return {
        isFetching,
        companyUserIDs,
        titleData,
        setTitleData,
    };
};

export default useTimesheetsTitle;
