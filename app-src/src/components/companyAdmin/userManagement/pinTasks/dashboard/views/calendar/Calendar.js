import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import moment from 'moment';
import React from 'react';

import useCalendar from './hooks/useCalendar';

const Calendar = ({ startDate }) => {
    const { days, matrix } = useCalendar(startDate);

    const dataMatrix = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [
            null,
            null,
            null,
            null,
            [
                {
                    type: 'recurring',
                    status: 'complete',
                },
            ],
            null,
            null,
        ],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];

    return (
        <BlockContainer contentClass="calendar">
            <Table headers={days}>
                {matrix.map((row, y) => (
                    <tr key={y}>
                        {row.map((date, x) => {
                            const tasks = dataMatrix[y][x];
                            const disabled = !moment(startDate).isSame(date, 'month');
                            return (
                                <td key={x} className={disabled ? 'disabled' : ''}>
                                    <div className="cell">
                                        <date>{moment(date).date()}</date>
                                        {tasks && !disabled ? (
                                            <p className="tasks">
                                                {tasks.map(({ type, status }, i) => (
                                                    <div className="task" key={i}>
                                                        <div className="circles">
                                                            <div className={`circle ${type}`} />
                                                            <div className={`circle ${status}`} />
                                                        </div>
                                                        <p className="name">0001:01</p>
                                                    </div>
                                                ))}
                                            </p>
                                        ) : (
                                            <p className="no-tasks">No Tasks</p>
                                        )}
                                        <ButtonContainer
                                            setColour="transparent"
                                            setColourHoverCode="#e6e6e6"
                                        >
                                            <i class="fas fa-plus" />
                                        </ButtonContainer>
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
