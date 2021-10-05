import moment from 'moment';
import data from './tempData';

const getDay = date => {
    const start = moment(date);

    return data.find(({ timestamp }) => start.isSame(timestamp, 'day'));
};

const useDay = date => {
    return getDay(date);
};

export default useDay;
