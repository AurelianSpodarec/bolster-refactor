import moment from 'moment';

const useFormattedBreakTime = timeline => {
    const breakMs = timeline.reduce(
        (acc, { breakIn, breakOut }) =>
            breakIn && breakOut
                ? acc + moment(breakOut.timestamp).diff(moment(breakIn.timestamp))
                : acc,
        0,
    );
    const formattedBreakTime = moment('0001-01-01T00:00:00').add(breakMs, 'ms').toDate();

    return formattedBreakTime;
};

export default useFormattedBreakTime;
