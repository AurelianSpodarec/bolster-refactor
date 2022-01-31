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
    console.log({ company });
    const oneMonthAfterCreated = moment.utc(companyCreatedOn).add(1, 'month');
    const threeMonthsAfterCreated = moment.utc(companyCreatedOn).add(3, 'months');
    const elevenMonthsAfterCreated = moment.utc(companyCreatedOn).add(11, 'months');
    const isOlderThan11Months = elevenMonthsAfterCreated.isBefore(moment.utc());

    const now = moment.utc();
    if (isOlderThan11Months) return { period: null, showWarning: false };
    if (now.isAfter(oneMonthAfterCreated) && !contactedAfterMonth) {
        return { period: 1, showWarning: true };
    }

    if (now.isAfter(threeMonthsAfterCreated) && !contactedAfterThreeMonths) {
        return { period: 2, showWarning: true };
    }

    if (now.isAfter(elevenMonthsAfterCreated) && !contactedAfterElevenMonths) {
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
