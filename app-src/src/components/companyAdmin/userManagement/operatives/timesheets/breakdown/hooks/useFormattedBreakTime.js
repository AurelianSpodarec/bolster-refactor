import moment from 'moment';

const useFormattedBreakTime = timeline => {
    return timeline.reduce(
        (acc, { breakIn, breakOut }) =>
            breakIn && breakOut
                ? acc + moment(breakOut.timestamp).diff(moment(breakIn.timestamp))
                : acc,
        0,
    );
};

export default useFormattedBreakTime;
