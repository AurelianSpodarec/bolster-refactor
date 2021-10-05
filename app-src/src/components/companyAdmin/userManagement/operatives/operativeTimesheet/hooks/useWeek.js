import moment from 'moment';
import data from './tempData';

const getWeek = startDate => {
    const start = moment(startDate);

    const week = Array(7)
        .fill(null)
        .map((_day, i) => {
            const date = moment(start).add(i, 'days');
            const entry = data.find(({ timestamp }) => date.isSame(timestamp, 'day'));
            if (entry) return entry;
            return { hours: 0, pins: 0, timestamp: date.format('YYYY-MM-DD') };
        });

    return week;
};

const useWeek = startDate => {
    return getWeek(startDate);
};

export default useWeek;
