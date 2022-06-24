import { useForm, usePrevious } from 'helpers/hooks';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectPayRatesPostSuccess } from 'selectors/companyAdmin/payRates';
import useGetCompanyUsersWorkingHours from './useGetCompanyUsersWorkingHours';
import { isObjEmpty } from 'helpers/generic';

const useWagesRegularHours = selectedUserIDs => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const { workingHours } = useGetCompanyUsersWorkingHours(selectedUserIDs[0]);

    const initialForm = useMemo(() => {
        if (!!workingHours && !isObjEmpty(workingHours)) {
            return workingHours;
        }
        return days.reduce((acc, day) => {
            return {
                ...acc,
                [day]: null,
            };
        }, {});
    }, [workingHours]);

    const [form, handleChange, setFormData] = useForm(initialForm);

    const prevPostSuccess = usePrevious(postSuccess);
    const postSuccess = useSelector(selectPayRatesPostSuccess);

    useEffect(() => {
        if (!!workingHours && !isObjEmpty(workingHours)) {
            setFormData(workingHours);
        }
    }, [workingHours]);

    useEffect(() => {
        if (postSuccess && !prevPostSuccess) {
            setFormData(initialForm);
        }
    }, [postSuccess, prevPostSuccess]);

    const handleDayChange = (name, value) => {
        if (value) {
            handleChange(name, {
                startTime: '09:00',
                breakMinutes: '15',
                endTime: '15:00',
            });
        } else {
            handleChange(name, null);
        }
    };

    const handleValueChange = (day, name, value) => {
        handleChange(day, {
            ...form[day],
            [name]: value,
        });
    };

    function timeDifference(start, end) {
        if (!start || !end) return;

        start = start.split(':');
        end = end.split(':');
        const startDate = new Date(0, 0, 0, start[0], start[1], 0);
        const endDate = new Date(0, 0, 0, end[0], end[1], 0);
        let diff = endDate.getTime() - startDate.getTime();
        let hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;
        const minutes = Math.floor(diff / 1000 / 60);

        return `${hours}h ${minutes}m`;
    }

    return { form, handleDayChange, handleChange: handleValueChange, days, timeDifference };
};

export default useWagesRegularHours;
