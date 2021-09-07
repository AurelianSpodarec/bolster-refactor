import moment from 'moment';

export const reverseObject = obj => {
    return Object.entries(obj).reduce((ret, entry) => {
        const [key, value] = entry;
        ret[value] = key;
        return ret;
    }, {});
};

export const companyTrackingShowWarning = company => {
    const {
        contactedAfterMonth,
        contactedAfterThreeMonths,
        contactedAfterElevenMonths,
        createdOn,
    } = company;

    const timeFromCreatedOn = {
        1: moment(createdOn).add(1, 'month').format('DD-MM-YYYY'),
        2: moment(createdOn).add(3, 'month').format('DD-MM-YYYY'),
        3: moment(createdOn).add(11, 'month').format('DD-MM-YYYY'),
    };

    if (!contactedAfterMonth && moment().isAfter(timeFromCreatedOn[1])) {
        return { period: 1, showWarning: true };
    }

    if (!contactedAfterThreeMonths && moment().isAfter(timeFromCreatedOn[2])) {
        return { period: 2, showWarning: true };
    }

    if (!contactedAfterElevenMonths && moment().isAfter(timeFromCreatedOn[3])) {
        return { period: 3, showWarning: true };
    }

    return { period: null, showWarning: false };
};
