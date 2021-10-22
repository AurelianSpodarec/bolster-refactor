import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import {
    DATE_TIME_IDS,
    PIN_TASK_RECURRING_NAMES,
    PIN_TASK_STATUS_NAMES,
} from 'constants/companyAdmin/enums';
import React from 'react';
import TaskPill from '../../TaskPill';
import useTypeAndStatus from '../hooks/useTypeAndStatus';

const ListTableRow = ({ pinTask, startEditPinTask }) => {
    const { id, companyUserID, pinID, isRecurring, actionedOn, dueOn } = pinTask;
    const { type, status } = useTypeAndStatus(isRecurring, actionedOn, dueOn);

    return (
        <tr>
            <td>{companyUserID}</td>
            <td></td>
            <td>{pinID}</td>
            <td>
                <DateTimeContainer datetime={DATE_TIME_IDS.DATE} date={new Date(dueOn)} />
            </td>
            <td>{!actionedOn ? 'N/A' : <DateTimeContainer date={new Date(actionedOn)} />}</td>
            <td>
                <div className="pills">
                    <TaskPill name={type} title={PIN_TASK_RECURRING_NAMES[type.toUpperCase()]} />
                    <TaskPill name={status} title={PIN_TASK_STATUS_NAMES[status.toUpperCase()]} />
                </div>
            </td>
            <td>
                <button
                    className="button yellow"
                    type="button"
                    onClick={() => startEditPinTask(id)}
                >
                    <i className="far fa-pencil" />
                    Edit Task
                </button>
            </td>
        </tr>
    );
};

export default ListTableRow;
