import moment from 'moment';
import numberNames from 'constants/shared/numberNames';

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

    if (
        moment.utc().isAfter(timeFromCreatedOn[1]) &&
        (!contactedAfterMonth || !contactedAfterThreeMonths || !contactedAfterElevenMonths)
    ) {
        return { period: 1, showWarning: true };
    }

    if (
        moment.utc().isAfter(timeFromCreatedOn[2]) &&
        (!contactedAfterThreeMonths || !contactedAfterElevenMonths)
    ) {
        return { period: 2, showWarning: true };
    }

    if (moment.utc().isAfter(timeFromCreatedOn[3]) && !contactedAfterElevenMonths) {
        return { period: 3, showWarning: true };
    }

    return { period: null, showWarning: false };
};

export const convertNameToNumber = name => {
    // Find keywords in floor labels to sort in order
    let acc = 0;
    try {
        if (name.match(/\d/)) {
            // If any numbers exists, use those
            let value = name
                .split('')
                .filter(c => c.match(/\d/))
                .join('');
            if (!Number.isNaN(+value)) acc += +value;
        } else {
            // Scan for keywords from lookup object
            Object.keys(numberNames).forEach(key => {
                if (name.toLowerCase().includes(key)) acc += numberNames[key];
            });
        }
    } catch {
        return acc;
    }
    return acc;
};
