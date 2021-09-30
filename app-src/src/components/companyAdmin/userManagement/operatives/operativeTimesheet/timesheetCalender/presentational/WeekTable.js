import Table from 'components/shared/generic/tables/presentational/Table';
import dayjs from 'dayjs';
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
    { hours: 9, pins: 98, date: dayjs('09-27-2021') },
    { hours: 6, pins: 87, date: dayjs('09-28-2021') },
    { hours: 9, pins: 76, date: dayjs('09-29-2021') },
    { hours: 12, pins: 56, date: dayjs('09-30-2021') },
    { hours: 15, pins: 34, date: dayjs('10-01-2021') },
    { hours: 10, pins: 34, date: dayjs('10-02-2021') },
    { hours: 4, pins: 101, date: dayjs('10-03-2021') },
];

const WeekTable = ({ selected, setSelected }) => {
    return (
        <Table headers={days}>
            <tr>
                {data.map(({ hours, pins, date }, i) => (
                    <td key={i} onClick={() => setSelected(i)}>
                        <div className="date">
                            <p>{date.date().toString().padStart(2, '0')}</p>
                            <i class="fal fa-circle" />
                        </div>
                        <div className="tabs">
                            <Tab icon={<i class="fal fa-stopwatch" />}>{hours} Hours</Tab>
                            <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                                {pins} Pins
                            </Tab>
                        </div>
                        {selected === i && <div className="film" />}
                    </td>
                ))}
                <td key={-1}>
                    <div className="date">
                        <p>
                            {data[0].date.date().toString().padStart(2, '0')} -{' '}
                            {data[6].date.date().toString().padStart(2, '0')}
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
