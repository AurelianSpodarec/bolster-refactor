import React from 'react';

import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { isEmpty } from 'lodash';

import CalendarPinTask from './CalendarPinTask';

const Calendar = ({ startDate, startCreatePinTask, viewTaskNote, days, matrix, isFetching }) => {
    return (
        <BlockContainer contentClass="calendar" isFetching={isFetching} isEmpty={isFetching}>
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
                                        {!pinTasks || !isEmpty(pinTasks) ? (
                                            <div className="tasks">
                                                {pinTasks.map((pinTask, i) => (
                                                    <CalendarPinTask
                                                        {...pinTask}
                                                        key={i}
                                                        viewTaskNote={viewTaskNote}
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="no-tasks">{!disabled && 'No Tasks'}</p>
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
