import showModal from 'actions/shared/generic/modals/sync/showModal';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { EDIT_PIN_TASK, EDIT_PIN_TASK_SERIES } from 'constants/shared/modalTypes';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';

import useCalendar from './hooks/useCalendar';

const Calendar = ({ startDate, startCreatePinTask }) => {
    const dispatch = useDispatch();
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
                    date: '2021-10-21T10:11:07.738Z',
                    recurring: 'none',
                    days: [],
                    operatives: [223, 5739, 8601],
                    site: 865,
                    building: 1356,
                    floor: 16845,
                    drawing: 18970,
                    pins: [3145722, 3145725, 3145727, 3145724, 3145726],
                },
            ],
            null,

            [
                {
                    type: 'non-recurring',
                    status: 'complete',
                    date: '2021-10-21T10:09:36.792Z',
                    endDate: '2021-10-21T10:09:36.792Z',
                    recurring: 'none',
                    days: [],
                    operatives: [5738, 223],
                    site: 821,
                    building: 1288,
                    floor: 2740,
                    drawing: 3226,
                    pins: [3233348, 3233350, 3233412],
                },
            ],
            ,
        ],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ];

    const editTask = (date, endDate, pins, drawing) => {
        console.log({ date, endDate, pins });
        if (endDate && pins)
            dispatch(showModal(EDIT_PIN_TASK_SERIES, { date, endDate, pins, drawing }));
        else dispatch(showModal(EDIT_PIN_TASK, { date }));
    };

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
                                        <time>{moment(date).format('DD')}</time>
                                        {tasks && !disabled ? (
                                            <div className="tasks">
                                                {tasks.map(
                                                    (
                                                        { type, status, endDate, pins, drawing },
                                                        i,
                                                    ) => (
                                                        <div className="task" key={i}>
                                                            <div className="group">
                                                                <div className={`circle ${type}`} />
                                                                <div
                                                                    className={`circle ${status}`}
                                                                />
                                                            </div>
                                                            <div className="group">
                                                                <ButtonContainer
                                                                    setColour="transparent"
                                                                    setColourHoverCode="#cccccc"
                                                                    handleClick={() =>
                                                                        editTask(
                                                                            date,
                                                                            endDate,
                                                                            pins,
                                                                            drawing,
                                                                        )
                                                                    }
                                                                >
                                                                    <i class="far fa-pencil" />
                                                                </ButtonContainer>
                                                                <p className="name">0001:01</p>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
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
