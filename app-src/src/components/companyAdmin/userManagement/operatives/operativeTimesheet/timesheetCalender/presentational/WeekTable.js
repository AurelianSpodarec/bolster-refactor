import Table from 'components/shared/generic/tables/presentational/Table';
import { days } from '../../../../../../../constants/companyAdmin/timesheets';
import moment from 'moment';
import Tab from './Tab';
import { TIME_PERIOD } from '../../../../../../../constants/companyAdmin/enums';

const WeekTable = ({ week, selectedDate, timePeriod, onDaySelect, onWeekSelect }) => {
    return (
        <Table headers={days}>
            <tr>
                {week.map(({ hours, pins, timestamp }, i) => (
                    <td key={i} onClick={() => onDaySelect(timestamp)}>
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
                        {selectedDate === timestamp && timePeriod === TIME_PERIOD.DAY && (
                            <div className="film" />
                        )}
                    </td>
                ))}
                <td key={-1} onClick={() => onWeekSelect()}>
                    <div className="date">
                        <p>
                            {moment(week[0].timestamp).date().toString().padStart(2, '0')} -{' '}
                            {moment(week[6].timestamp).date().toString().padStart(2, '0')}
                        </p>
                        <i class="fal fa-circle" />
                    </div>
                    <div className="tabs">
                        <Tab icon={<i class="fal fa-stopwatch" />}>
                            {week.reduce((acc, { hours }) => acc + hours, 0)} Hours
                        </Tab>
                        <Tab icon={<i class="fal fa-map-pin" style={{ padding: '0 3px' }} />}>
                            {week.reduce((acc, { pins }) => acc + pins, 0)} Pins
                        </Tab>
                    </div>
                    {timePeriod === TIME_PERIOD.WEEK && <div className="film" />}
                </td>
            </tr>
        </Table>
    );
};

export default WeekTable;
