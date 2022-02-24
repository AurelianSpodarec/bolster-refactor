import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PinTaskList from '../presentational/PinTaskList';

import {
    selectPinTasksIsFetching,
    selectSinglePinTasks,
    selectSinglePinTaskSeries,
} from '../../../../../selectors/companyAdmin/pinTasks';

import fetchSinglePinTasks from 'actions/companyAdmin/pinTasks/async/fetchSinglePinTasks';
import moment from 'moment';
import { selectCompanyUsers } from '../../../../../selectors/companyAdmin/companyUsers';

const PinTaskListContainer = () => {
    const dispatch = useDispatch();
    const { id: pinID } = useParams();

    const companyUsers = useSelector(selectCompanyUsers);
    const pinSeries = Object.values(useSelector(selectSinglePinTaskSeries));
    const pinTasks = Object.values(useSelector(selectSinglePinTasks));

    const isFetching = useSelector(selectPinTasksIsFetching);

    const pinSeriesToShow = useMemo(
        () =>
            pinSeries.map(series => {
                const futureTasks = pinTasks
                    .reduce((acc, task) => {
                        if (
                            task.pinTaskSeriesID &&
                            task.pinTaskSeriesID === series.id &&
                            moment(task.dueOn).isAfter(moment())
                        ) {
                            acc.push(task);
                        }

                        return acc;
                    }, [])
                    .sort((a, b) => {
                        return moment(a.dueOn) - moment(b.dueOn);
                    });

                const nextTask = futureTasks[0];
                const companyUser = companyUsers[series.companyUserID];
                const formattedUserName = `${companyUser?.userFirstName} ${companyUser?.userLastName} - ${companyUser?.formattedOperativeCode} (${companyUser?.companyName})`;

                return {
                    ...series,
                    nextTaskDate: nextTask?.dueOn,
                    companyUserName: formattedUserName,
                };
            }),
        [pinTasks, pinSeries, companyUsers],
    );

    const nonRecurringPinTasksToShow = useMemo(
        () =>
            pinTasks.reduce((acc, task) => {
                const companyUser = companyUsers[task.companyUserID];
                const formattedUserName = `${companyUser?.userFirstName} ${companyUser?.userLastName} - ${companyUser?.formattedOperativeCode} (${companyUser?.companyName})`;

                if (!task.actionedByHistoryID && !task.isRecurring) {
                    acc.push({
                        ...task,
                        companyUserName: formattedUserName,
                    });
                }

                return acc;
            }, []),
        [pinTasks, companyUsers],
    );

    useEffect(() => {
        if (!isFetching && !!pinID) dispatch(fetchSinglePinTasks(pinID));
    }, [pinID]);

    return (
        <PinTaskList
            pinSeries={pinSeriesToShow}
            nonRecurringPinTasks={nonRecurringPinTasksToShow}
            isFetching={isFetching}
        />
    );
};

export default PinTaskListContainer;
