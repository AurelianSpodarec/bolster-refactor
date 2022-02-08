import moment from 'moment';

import { useSelector } from 'react-redux';
import { selectUserFilters } from 'selectors/companyAdmin/companyUsers';
import {
    selectPinRecurrenceFilters,
    selectPinStatusFilters,
} from 'selectors/companyAdmin/pinTasks';
import { selectServiceFilters } from 'selectors/companyAdmin/services';
import { selectSiteFilters } from 'selectors/companyAdmin/sites';

import { PIN_TASK_RECURRING, PIN_TASK_STATUS } from 'constants/companyAdmin/enums';

const { RECURRING, NON_RECURRING } = PIN_TASK_RECURRING;
const { COMPLETE_LATE, COMPLETE, INCOMPLETE, DUE_SOON } = PIN_TASK_STATUS;

const useFilteredPinTasks = tasks => {
    const selectedRecurrenceFilter = useSelector(selectPinRecurrenceFilters);
    const selectedStatusFilter = useSelector(selectPinStatusFilters);
    const selectUserFilter = useSelector(selectUserFilters);
    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectSiteFilter = useSelector(selectSiteFilters);

    const pinTasks = Object.values(tasks).filter(task => {
        const recurringName = task.isRecurring ? RECURRING : NON_RECURRING;

        const statusName = task.actionedOn
            ? moment(task.actionedOn).isAfter(task.dueOn)
                ? COMPLETE_LATE
                : COMPLETE
            : moment(task.dueOn).isBefore()
            ? INCOMPLETE
            : DUE_SOON;

        if (selectedRecurrenceFilter && selectedRecurrenceFilter !== recurringName) {
            return false;
        }

        if (selectedStatusFilter.length && !selectedStatusFilter.includes(statusName)) {
            return false;
        }

        if (selectSiteFilter.length) {
            return selectSiteFilter.includes(task.siteID);
        } else if (selectUserFilter.length) {
            return selectUserFilter.includes(task.companyUserID);
        } else if (selectServiceFilter.length) {
            return selectServiceFilter.includes(task.serviceID);
        }

        return true;
    });

    return pinTasks;
};

export default useFilteredPinTasks;
