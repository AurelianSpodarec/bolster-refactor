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
        companyCreatedOn,
    } = company;

    const timeFromCreatedOn = {
        1: moment.utc(companyCreatedOn).add(1, 'month'),
        2: moment.utc(companyCreatedOn).add(3, 'month'),
        3: moment.utc(companyCreatedOn).add(11, 'month'),
    };

    if (moment.utc().isAfter(timeFromCreatedOn[1]) && !contactedAfterMonth) {
        return { period: 1, showWarning: true };
    }

    if (
        moment.utc().isAfter(timeFromCreatedOn[2]) &&
        (!contactedAfterMonth || !contactedAfterThreeMonths)
    ) {
        return { period: 2, showWarning: true };
    }

    if (
        moment.utc().isAfter(timeFromCreatedOn[3]) &&
        (!contactedAfterMonth || !contactedAfterThreeMonths || !contactedAfterElevenMonths)
    ) {
        return { period: 3, showWarning: true };
    }

    return { period: null, showWarning: false };
};
