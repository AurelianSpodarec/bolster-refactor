import moment from 'moment';
import data from './tempData';

const getDay = date => {
    const start = moment(startDate);

    return data.find(({ timestamp }) => date.isSame(timestamp, 'day'));
};

const useDay = date => {
    return getWeek(date);
};

export default useDay;
