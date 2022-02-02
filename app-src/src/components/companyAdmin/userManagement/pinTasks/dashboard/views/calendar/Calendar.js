import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import Table from 'components/shared/generic/tables/presentational/Table';
import { PIN_TASK_RECURRING, PIN_TASK_STATUS } from 'constants/companyAdmin/enums';
import { isEmpty } from 'lodash';
import {
    selectPinRecurrenceFilters,
    selectPinStatusFilters,
} from 'selectors/companyAdmin/pinTasks';
import CalendarPinTask from './CalendarPinTask';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectSiteFilters } from 'selectors/companyAdmin/sites';

const { RECURRING, NON_RECURRING } = PIN_TASK_RECURRING;
const { COMPLETE_LATE, COMPLETE, INCOMPLETE, DUE_SOON } = PIN_TASK_STATUS;

const Calendar = ({ startDate, startCreatePinTask, viewTaskNote, days, matrix, isFetching }) => {
    const selectedRecurrenceFilter = useSelector(selectPinRecurrenceFilters);
    const selectedStatusFilter = useSelector(selectPinStatusFilters);
    const selectUserFilter = useSelector(selectUserFilters);
    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectSiteFilter = useSelector(selectSiteFilters);

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
                                                {pinTasks
                                                    .filter(task => {
                                                        const recurringName = task.isRecurring
                                                            ? RECURRING
                                                            : NON_RECURRING;

                                                        const statusName = task.actionedOn
                                                            ? moment(task.actionedOn).isAfter(
                                                                  task.dueOn,
                                                              )
                                                                ? COMPLETE_LATE
                                                                : COMPLETE
                                                            : moment(task.dueOn).isBefore()
                                                            ? INCOMPLETE
                                                            : DUE_SOON;

                                                        if (
                                                            selectedRecurrenceFilter &&
                                                            selectedRecurrenceFilter !==
                                                                recurringName
                                                        ) {
                                                            return false;
                                                        }

                                                        if (
                                                            selectedStatusFilter.length &&
                                                            !selectedStatusFilter.includes(
                                                                statusName,
                                                            )
                                                        ) {
                                                            return false;
                                                        }

                                                        if (
                                                            selectUserFilter.length &&
                                                            !selectUserFilter.includes(
                                                                task.companyUserID,
                                                            )
                                                        ) {
                                                            return false;
                                                        }

                                                        if (
                                                            selectServiceFilter.length &&
                                                            !selectServiceFilter.includes(
                                                                task.serviceID,
                                                            )
                                                        ) {
                                                            return false;
                                                        }

                                                        if (
                                                            selectSiteFilter.length &&
                                                            !selectSiteFilter.includes(task.siteID)
                                                        ) {
                                                            return false;
                                                        }

                                                        return true;
                                                    })
                                                    .map((pinTask, i) => (
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
