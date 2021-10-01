import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';
import Tab from './Tab';

const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Weekly',
];

const data = [
    { hours: 9, pins: 98, timestamp: '2021-09-20' },
    { hours: 9, pins: 98, timestamp: '2021-09-21' },
    { hours: 9, pins: 98, timestamp: '2021-09-22' },
    { hours: 9, pins: 98, timestamp: '2021-09-23' },
    { hours: 9, pins: 98, timestamp: '2021-09-24' },
    { hours: 9, pins: 98, timestamp: '2021-09-25' },
    { hours: 9, pins: 98, timestamp: '2021-09-26' },

    { hours: 9, pins: 98, timestamp: '2021-09-27' },
    { hours: 6, pins: 87, timestamp: '2021-09-28' },
    { hours: 9, pins: 76, timestamp: '2021-09-29' },
    { hours: 12, pins: 56, timestamp: '2021-09-30' },
    { hours: 15, pins: 34, timestamp: '2021-09-01' },
    { hours: 10, pins: 34, timestamp: '2021-10-02' },
    { hours: 4, pins: 101, timestamp: '2021-10-03' },

    { hours: 9, pins: 98, timestamp: '2021-10-04' },
    { hours: 6, pins: 87, timestamp: '2021-10-05' },
    { hours: 9, pins: 76, timestamp: '2021-10-06' },
    { hours: 12, pins: 56, timestamp: '2021-10-07' },
    { hours: 15, pins: 34, timestamp: '2021-10-08' },
    { hours: 10, pins: 34, timestamp: '2021-10-09' },
    { hours: 4, pins: 101, timestamp: '2021-10-10' },
];

const getWeek = startDate => {
    const start = moment(startDate);

    const week = Array(7)
        .fill(null)
        .map((_day, i) => {
            const date = moment(start).add(i, 'days');
            const entry = data.find(({ timestamp }) => date.isSame(timestamp));
            if (entry) return entry;
            return { hours: 0, pins: 0, timestamp: date.format('YYYY-MM-DD') };
        });

    return week;
};

const WeekTable = ({ selected, setSelected, startDate }) => {
    const week = getWeek(startDate);
    return (
        <Table headers={days}>
            <tr>
                {week.map(({ hours, pins, timestamp }, i) => (
                    <td key={i} onClick={() => setSelected(timestamp)}>
                        <div className="date">
                            <p>{moment(timestamp).date().toString().padStart(2, '0')}</p>
                            <i class="fal fa-circle" />
                        </div>
                        <div className="tabs">
                            <Tab icon={<i class="fal fa-stopwatch" />}>{hours} Hours</Tab>
                            <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                                {pins} Pins
                            </Tab>
                        </div>
                        {selected === timestamp && <div className="film" />}
                    </td>
                ))}
                <td key={-1}>
                    <div className="date">
                        <p>
                            {moment(data[0].timestamp).date().toString().padStart(2, '0')} -{' '}
                            {moment(data[6].timestamp).date().toString().padStart(2, '0')}
                        </p>
                        <i class="fal fa-circle" />
                    </div>
                    <div className="tabs">
                        <Tab icon={<i class="fal fa-stopwatch" />}>
                            {data.reduce((acc, { hours }) => acc + hours, 0)} Hours
                        </Tab>
                        <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                            {data.reduce((acc, { pins }) => acc + pins, 0)} Pins
                        </Tab>
                    </div>
                </td>
            </tr>
        </Table>
    );
};

export default WeekTable;
