import { useForm } from 'helpers/hooks';

const useUpcomingAlerts = () => {
    const [fields, handleChange] = useForm({
        selectedRole: 0,
    });

    return {
        fields,
        handleChange,
    };
};

export default useUpcomingAlerts;
