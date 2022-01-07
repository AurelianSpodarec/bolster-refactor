import { ALERT_FREQUENCY_TYPES, ALERT_METHOD_TYPES } from 'constants/companyAdmin/enums';
import { useForm } from 'helpers/hooks';
import moment from 'moment';

const useCreateHierarchyAlert = () => {
    const [form, handleChange] = useForm({
        name: '',
        description: '',
        method: ALERT_METHOD_TYPES.ALL,
        date: new Date(),
        frequencyType: ALERT_FREQUENCY_TYPES.ONCE,
        frequencyAmount: '1',
    });

    const handleSubmit = () => {
        const postBody = {
            ...form,
            date: moment(form.date).format(),
            frequencyAmount:
                form.frequencyType === ALERT_FREQUENCY_TYPES.ONCE
                    ? 1
                    : parseInt(form.frequencyAmount),
        };

        console.log(postBody);
    };

    return {
        form,
        handleChange,
        handleSubmit,
    };
};

export default useCreateHierarchyAlert;
