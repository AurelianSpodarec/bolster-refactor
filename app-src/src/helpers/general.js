import moment from 'moment';
import FileIcon from '_content/images/icons/dl-file-icon.svg';
import PDFIcon from '_content/images/icons/dl-pdf-icon.svg';
import ImageIcon from '_content/images/icons/dl-image-icon.svg';

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

export const getIconFromExt = ext => {
    switch (ext) {
        case 'pdf':
        case '.pdf':
            return PDFIcon;
        case 'png':
        case '.png':
        case 'jpg':
        case '.jpg':
        case 'jpeg':
        case '.jpeg':
        case 'bmp':
        case '.bmp':
        case 'gif':
        case '.gif':
            return ImageIcon;
        default:
            return FileIcon;
    }
};

export const stripS3Key = (s3Key, companyID) => {
    const keyArr = s3Key.split('/');
    return keyArr.slice(keyArr.indexOf('' + companyID) + 1, keyArr.length).join('/');
};

export const doPinsHaveIcons = (pins = []) =>
    pins.some(pin => pin.templatePinImageS3Key || pin.servicePinImageS3Key);
