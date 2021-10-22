import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const useBugReportsTable = () => {
    const dispatch = useDispatch();

    const [dates, setDates] = useState({
        dateFrom: moment().subtract(1, 'years').toDate(),
        dateTo: moment().toDate(),
    });

    const bugReports = [
        {
            ticketRef: '1',
            companyName: 'Silverchip',
            accessCredentials: 'Seb@ios-op.com  Password',
            affectedUserCount: 1,
            deviceDetails: 'iPhone 11',
            appVersion: '12.0.5',
            aboutDeviceScreenshot: '',
            browserUsed: 'Firefox',
            systemPage: 'Upsync',
            dateIssueOccured: moment(),
            fullDescription: 'Description',
            evidenceFile: '',
            status: 'Complete',
        },
        {
            ticketRef: '2',
            companyName: 'Silverchip',
            accessCredentials: 'Seb@ios-op.com  Password',
            affectedUserCount: 1,
            deviceDetails: 'iPhone 11',
            appVersion: '12.0.5',
            aboutDeviceScreenshot: '',
            browserUsed: 'Firefox',
            systemPage: 'Upsync',
            dateIssueOccured: moment(),
            fullDescription: 'Description',
            evidenceFile: '',
            status: 'Complete',
        },
        {
            ticketRef: '3',
            companyName: 'Silverchip',
            accessCredentials: 'Seb@ios-op.com  Password',
            affectedUserCount: 1,
            deviceDetails: 'iPhone 11',
            appVersion: '12.0.5',
            aboutDeviceScreenshot: '',
            browserUsed: 'Firefox',
            systemPage: 'Upsync',
            dateIssueOccured: moment(),
            fullDescription: 'Description',
            evidenceFile: '',
            status: 'Complete',
        },
    ];

    useEffect(() => {
        // Fetch bug reports filtered by date
    }, [dates]);

    return { dates, setDates, bugReports };
};

export default useBugReportsTable;
