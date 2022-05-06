import moment from 'moment';

export const dummyLineGraphData = {
    total: 18616.78,
    labels: Array(7)
        .fill(moment())
        .map((d, i) => d.subtract(i, 'days').format('MMM DD')),
    datasets: [
        {
            id: 1,
            label: '',
            data: [12000, 14000, 18616.78, 19463.78, 20490, 24490, 28490],
        },
    ],
};
