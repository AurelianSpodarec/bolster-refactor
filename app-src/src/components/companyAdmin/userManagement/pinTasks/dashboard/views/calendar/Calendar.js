import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';
import React from 'react';
import CalendarPinTask from './CalendarPinTask';

import useCalendar from './hooks/useCalendar';

const Calendar = ({ startDate, startCreatePinTask }) => {
    const { days, matrix, noData, isFetching, error } = useCalendar(startDate);

    return (
        <BlockContainer
            contentClass="calendar"
            isFetching={isFetching}
            error={error}
            isEmpty={noData}
        >
            <Table headers={days}>
                {matrix.map((row, y) => (
                    <tr key={y}>
                        {row.map(({ date, pinTasks }, x) => {
                            const disabled = !moment(startDate).isSame(date, 'month');
                            const isToday = moment(date).isSame(new Date(), 'day');
                            return (
                                <td key={x} className={disabled ? 'disabled' : ''}>
                                    <div className="cell">
                                        <time>{moment(date).format('DD')}</time>
                                        {!disabled ? (
                                            <div className="tasks">
                                                {pinTasks.map((pinTask, i) => (
                                                    <CalendarPinTask pinTask={pinTask} key={i} />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-tasks">No Tasks</p>
                                        )}
                                        <ButtonContainer
                                            setColour="transparent"
                                            setColourHoverCode="#e6e6e6"
                                            disabled={disabled}
                                            handleClick={() => startCreatePinTask(date)}
                                        >
                                            <i className="fas fa-plus" />
                                        </ButtonContainer>
                                        {isToday && <div className="film" />}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </Table>
        </BlockContainer>
    );
};

export default Calendar;
