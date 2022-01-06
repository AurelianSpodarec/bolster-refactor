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

export function formatDropdownOptions(options) {
    return options.map(({ id, text }) => ({ value: id, label: text }));
}

export const getSearchMatch = (searchTerm, data) => {
    if (!searchTerm) return true;
    const searchArr = searchTerm.toLowerCase().split(/[\s-.]/);
    const dataArr = data.toLowerCase().split(/[\s-.]/);
    return searchArr.some(sWord =>
        dataArr.some(dWord => dWord.includes(sWord) || sWord.includes(dWord)),
    );
};
