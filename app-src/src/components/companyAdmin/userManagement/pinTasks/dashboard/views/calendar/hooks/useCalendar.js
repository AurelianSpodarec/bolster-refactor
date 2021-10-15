import moment from 'moment';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useCalendar = startDate => {
    const weekday = moment(startDate).isoWeekday() - 1;

    const matrix = [[], [], [], [], []];

    const currDate = moment(startDate).subtract(weekday, 'days');
    for (let i = 0; i < 7 * 5; i++) {
        const x = Math.floor(i / 7);
        const y = i % 7;

        matrix[x][y] = currDate.format();
        currDate.add(1, 'day');
    }

    return { days, matrix };
};

export default useCalendar;
