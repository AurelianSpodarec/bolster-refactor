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
