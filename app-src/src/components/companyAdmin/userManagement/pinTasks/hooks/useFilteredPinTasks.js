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
import { selectTemplateFilters } from 'selectors/companyAdmin/templates';

const { RECURRING, NON_RECURRING } = PIN_TASK_RECURRING;
const { COMPLETE_LATE, COMPLETE, INCOMPLETE, DUE_SOON } = PIN_TASK_STATUS;

const useFilteredPinTasks = tasks => {
    const selectedRecurrenceFilter = useSelector(selectPinRecurrenceFilters);
    const selectedStatusFilter = useSelector(selectPinStatusFilters);
    const selectUserFilter = useSelector(selectUserFilters);
    const selectServiceFilter = useSelector(selectServiceFilters);
    const selectTemplateFilter = useSelector(selectTemplateFilters);
    const selectSiteFilter = useSelector(selectSiteFilters);

    const pinTasks = Object.values(tasks).filter(task => {
        const recurringName = task.isRecurring ? RECURRING : NON_RECURRING;
        let statusName = '';

        if (task.actionedOn) {
            if (moment(task.actionedOn).isAfter(task.dueOn)) {
                statusName = COMPLETE_LATE;
            } else {
                statusName = COMPLETE;
            }
        } else {
            if (moment(task.dueOn).isBefore()) {
                statusName = INCOMPLETE;
            } else {
                statusName = DUE_SOON;
            }
        }

        if (selectedRecurrenceFilter && selectedRecurrenceFilter !== recurringName) {
            return false;
        }

        if (selectedStatusFilter.length && !selectedStatusFilter.includes(statusName)) {
            return false;
        }

        if (selectServiceFilter.length && !selectServiceFilter.includes(task.serviceID)) {
            return false;
        }

        if (selectTemplateFilter.length && !selectTemplateFilter.includes(task.templateID)) {
            return false;
        }

        if (selectSiteFilter.length && !selectSiteFilter.includes(task.siteID)) {
            return false;
        }

        if (selectUserFilter.length && !selectUserFilter.includes(task.companyUserID)) {
            return false;
        }

        return true;
    });

    return pinTasks;
};

export default useFilteredPinTasks;
