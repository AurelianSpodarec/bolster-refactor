import { PIN_TASK_RECURRING, PIN_TASK_STATUS } from 'constants/companyAdmin/enums';
import moment from 'moment';

const useTypeAndStatus = (isRecurring, actionedOn, dueOn) => {
    const type = isRecurring ? PIN_TASK_RECURRING.RECURRING : PIN_TASK_RECURRING.NON_RECURRING;
    let status = '';
    if (actionedOn) {
        if (moment(actionedOn).isAfter(dueOn)) status = PIN_TASK_STATUS.COMPLETE_LATE;
        else status = PIN_TASK_STATUS.COMPLETE;
    } else {
        if (moment(dueOn).isBefore(new Date())) status = PIN_TASK_STATUS.INCOMPLETE;
        else status = PIN_TASK_STATUS.DUE_SOON;
    }

    return { type, status };
};

export default useTypeAndStatus;
